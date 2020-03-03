const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const keys = require("../config/keys");
const getConfigs = require("../config/getConfigs");
const uniqueRandom = require("unique-random");
const rand = uniqueRandom(10000000, 99999999);

const Customer = require("../models/Customer");

const validateRegistrationForm = require("../validation/validationHelper");

const queryCreator = require("../commonHelpers/queryCreator");


exports.getCustomers = (req, res, next) => {
  Customer.find({$or:[{}]})
    .then(customers => {
      if (customers) {
        return res.json(customers);
      }
      return res.json([]);
    })
      .catch(err =>

      res.status(400).json({
        message: `Error happened on server: "${err}" `
      })
    );
};


  exports.createCustomer = (req, res, next) => {

  const initialQuery = _.cloneDeep(req.body);
  initialQuery.customerNo = rand();

  const { errors, isValid } = validateRegistrationForm(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  Customer.findOne({
    $or: [{ email: req.body.email }, { login: req.body.login }]
  })
    .then(customer => {
      if (customer) {
        if (customer.email === req.body.email) {
          return res
            .status(400)
            .json({ message: `Email ${customer.email} already exists"` });
        }

        if (customer.login === req.body.login) {
          return res
            .status(400)
            .json({ message: `Login ${customer.login} already exists` });
        }
      }


      const newCustomer = new Customer(queryCreator(initialQuery));

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newCustomer.password, salt, (err, hash) => {
          if (err) {
            res
              .status(400)
              .json({ message: `Error happened on server: ${err}` });

            return;
          }

          newCustomer.password = hash;
          newCustomer
            .save()
            .then(customer => res.json(customer))
            .catch(err =>
              res.status(400).json({
                message: `Error happened on server: "${err}" `
              })
            );
        });
      });
    })
    .catch(err =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `
      })
    );
};



exports.loginCustomer = async (req, res, next) => {
  const { errors, isValid } = validateRegistrationForm(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const loginOrEmail = req.body.loginOrEmail;
  const password = req.body.password;
  const configs = await getConfigs();

  Customer.findOne({
    $or: [{ email: loginOrEmail }, { login: loginOrEmail }]
  })
    .then(customer => {
      if (!customer) {
        errors.loginOrEmail = "Customer not found";
        return res.status(404).json(errors);
      }

      if (!customer.enabled) {
        errors.enabled = "Customer is not active";
        return res.status(404).json(errors);
      }

      bcrypt.compare(password, customer.password).then(isMatch => {
        if (isMatch) {
          const payload = {
            id: customer.id,
            firstName: customer.firstName,
            lastName: customer.lastName,
            isAdmin: customer.isAdmin
          };

          jwt.sign(
            payload,
            keys.secretOrKey,
            { expiresIn: 36000 },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token
              });
            }
          );
        } else {
          errors.password = "Password incorrect";
          return res.status(400).json(errors);
        }
      });
    })
    .catch(err =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `
      })
    );
};

exports.getCustomer = (req, res) => {
  res.json(req.user);
};

exports.editCustomerInfo = (req, res) => {

  const initialQuery = _.cloneDeep(req.body);

  const { errors, isValid } = validateRegistrationForm(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  Customer.findOne({ _id: req.user.id })
    .then(customer => {
      if (!customer) {
        errors.id = "Customer not found";
        return res.status(404).json(errors);
      }

      const currentEmail = customer.email;
      const currentLogin = customer.login;
      let newEmail;
      let newLogin;

      if (req.body.email) {
        newEmail = req.body.email;

        if (currentEmail !== newEmail) {
          Customer.findOne({ email: newEmail }).then(customer => {
            if (customer) {
              errors.email = `Email ${newEmail} is already exists`;
              res.status(400).json(errors);
              return;
            }
          });
        }
      }

      if (req.body.login) {
        newLogin = req.body.login;

        if (currentLogin !== newLogin) {
          Customer.findOne({ login: newLogin }).then(customer => {
            if (customer) {
              errors.login = `Login ${newLogin} is already exists`;
              res.status(400).json(errors);
              return;
            }
          });
        }
      }

      const updatedCustomer = queryCreator(initialQuery);

      Customer.findOneAndUpdate(
        { _id: req.user.id },
        { $set: updatedCustomer },
        { new: true }
      )
        .then(customer => res.json(customer))
        .catch(err =>
          res.status(400).json({
            message: `Error happened on server: "${err}" `
          })
        );
    })
    .catch(err =>
      res.status(400).json({
        message: `Error happened on server:"${err}" `
      })
    );
};


exports.updatePassword = (req, res) => {

  const { errors, isValid } = validateRegistrationForm(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  Customer.findOne({ _id: req.user.id }, (err, customer) => {
    let oldPassword = req.body.password;

    customer.comparePassword(oldPassword, function(err, isMatch) {
      if (!isMatch) {
        errors.password = "Password does not match";
        res.json(errors);
      } else {
        let newPassword = req.body.newPassword;

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newPassword, salt, (err, hash) => {
            if (err) throw err;
            newPassword = hash;
            Customer.findOneAndUpdate(
              { _id: req.user.id },
              {
                $set: {
                  password: newPassword
                }
              },
              { new: true }
            )
              .then(customer => {
                res.json({
                  message: "Password successfully changed",
                  customer: customer
                });
              })
              .catch(err =>
                res.status(400).json({
                  message: `Error happened on server: "${err}" `
                })
              );
          });
        });
      }
    });
  });
};

exports.editCustomerAdmin = (req, res, next) => {
  Customer.findOne({ _id: req.params.id })
    .then(customer => {
      if (!customer) {
        return res.status(400).json({
          message: `Admin with id "${req.params.id}" is not found.`
        });
      } else {
        const initialQuery = _.cloneDeep(req.body);

        const updatedCustomer = queryCreator(initialQuery);

        Customer.findOneAndUpdate(
          { _id: req.params.id },
          { $set: updatedCustomer },
          { new: true }
        )
          .then(customer =>
            res.status(200).json(customer))
          .catch(err =>
            res.status(400).json({
              message: `Error happened on server: "${err}" `
            })
          );
      }
    })
    .catch(err =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `
      })
    );
};