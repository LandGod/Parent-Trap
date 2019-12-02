const router = require("express").Router();
const memberController = require("../../controllers/memberController");
const mongoose = require("mongoose"); // For working with mongoose Date and ObjectId objects

router
  .route("/all")
  // GET all members 
  .get(function(req, res) {
      console.log(req.body)
       // Validate req body
        if (!req.body) {
            res.status(400).send("Request has no body!");
            return;
        }

        // send request to get all of the members
        memberController
            .findAll()
            .then(function(result) {
                console.log(result)
                res.status(200).json(result);
            })
            .catch(function(err){
                res.status(500).send(err);
            })

    });

router
    .route("/login")
    .put(function(req, res) {

        memberController
            .findByEmail(req.body.email)
            .then(function(result) {

                // if no email exists, return 204 status message to client. This will tell the client to redirect to the household page
                if (result.length === 0) {
                    res.status(204).end();
                    console.log('204 logged')
                    return
                }

                // if there are two emails in the database shut that shit down
                if (result.length > 1) {
                    res.status(500).send('Multiple users found with that email');
                    console.log('why are there 2 users with the same email')
                    return;
                }

                // if auth key exists it should match the auth key associated with the email
                if (result[0].userOauthKey) {
                    if (result[0].userOauthKey === req.body.id) {
                    res.status(200).send(result)
                    return;
                    } else {
                        // shut that shit down if the auth keys do not match
                        console.log('auth keys don\'t match')
                        res.status(500).send('auth keys do not match')
                        return;
                    }
                } else {

                    console.log('made it to the add user oauth key to existing account section')
                    console.log(req.body.id)
                    // if auth key does not exist but the email exists then add the auth key to the database
                    memberController
                        .updateUser(result[0]._id, {
                            userOauthKey: req.body.id,
                            status: 'full'
                        })
                        .then(function(result2) {
                            res.status(200).send('auth key successfully added to existing user');
                            return;
                        })
                        .catch(function(err) {
                            console.log(err)
                            res.status(500).send(err);
                            return;
                        })
                }


            })
            .catch(function(err){
                res.status(500).send(err);
            })
    });
    
// resolves as /api/member/:id    
router
  .route("/:id")
  .get(function(req, res) {
    // Validate req params
    if (!req.params) {
      res.status(400).send("Request object has no parameters!");
      return;
    }

    // Get member id & assert that it is not undefined 
    let memberId = req.params.id;
    console.log(`Events.js ServerSide memberId is:  ${memberId}`)
    if (!memberId) {
      res.status(400).send("No memberId");
      return;
    }

    // Cast to mongoose ObjectId
    memberId = mongoose.Types.ObjectId(memberId);

    // Send parsed and validated request data to event controller
    memberController
    .findById(memberId)

    // Resolve request with results from db operation
    .then(function(result) {
      // console.log(JSON.stringify(result));
      res.status(200).json(result);
    })
    .catch(function(err) {
      res.status(500).send(err);
    }); 
});
  
  

module.exports = router;