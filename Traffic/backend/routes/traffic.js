// const express = require('express');
// const Locality = require('../models/locality');
// const Node = require('../models/node');
// const Signal = require('../models/signal');

// const router = express.Router();

// // Create a new locality
// router.post('/locality', async (req, res) => {
//   try {
//     const locality = new Locality(req.body);
//     await locality.save();
//     res.status(201).send(locality);
//   } catch (err) {
//     res.status(400).send(err);
//   }
// });

// // Get all localities
// router.get('/localities', async (req, res) => {
//   try {
//     const localities = await Locality.find().populate('nodes'); // Populate nodes for each locality
//     res.status(200).send(localities);
//   } catch (err) {
//     res.status(400).send(err);
//   }
// });

// // Create a new node
// router.post('/node', async (req, res) => {
//   try {
//     const node = new Node(req.body);
//     await node.save();
//     // Update the corresponding locality to add this node
//     await Locality.findByIdAndUpdate(node.localityId, {
//         $push: { nodes: node._id }
//       });
//     res.status(201).send(node);
//   } catch (err) {
//     res.status(400).send(err);
//   }
// });

// // Get all nodes in a locality
// router.get('/locality/:id/nodes', async (req, res) => {
//   try {
//     const nodes = await Node.find({ localityId: req.params.id }).populate('signals'); // Populate signals for each node
//     res.status(200).send(nodes);
//   } catch (err) {
//     res.status(400).send(err);
//   }
// });

// // Create a new signal
// router.post('/signal', async (req, res) => {
//   try {
//     const signal = new Signal(req.body);
//     await signal.save();
//     await Node.findByIdAndUpdate(signal.nodeId, {
//         $push: { signals: signal._id }
//       });
//     res.status(201).send(signal);
//   } catch (err) {
//     res.status(400).send(err);
//   }
// });

// // Get signals for a node
// router.get('/node/:id/signals', async (req, res) => {
//   try {
//     const signals = await Signal.find({ nodeId: req.params.id });
//     res.status(200).send(signals);
//   } catch (err) {
//     res.status(400).send(err);
//   }
// });

// // Get all nodes in the logged-in user's locality
// router.get('/locality/nodes', async (req, res) => {
//   try {
//     const userId = req.user._id; // Assuming you have user information in req.user from the authentication middleware
//     const user = await User.findById(userId);

//     if (!user || !user.localityId) {
//       return res.status(404).send({ message: "Locality not found for user." });
//     }

//     const nodes = await Node.find({ localityId: user.localityId }).populate('signals'); // Populate signals for each node
//     res.status(200).send(nodes);
//   } catch (err) {
//     res.status(400).send(err);
//   }
// });




// module.exports = router;



//routes/traffic.js

const express = require('express');
const mongoose = require('mongoose');
const Locality = require('../models/locality');
const Node = require('../models/node');
const Signal = require('../models/signal');

const router = express.Router();

// Create a new locality
router.post('/locality', async (req, res) => {
  try {
    const locality = new Locality(req.body);
    await locality.save();
    res.status(201).send(locality);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Get all localities with populated nodes
router.get('/localities', async (req, res) => {
  try {
    const localities = await Locality.find().populate('nodes');
    res.status(200).send(localities);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Get locality by ID
router.get('/locality/:id', async (req, res) => {
  const localityId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(localityId)) {
    return res.status(400).json({ message: 'Invalid locality ID' });
  }

  try {
    const locality = await Locality.findById(localityId).populate('nodes');
    if (!locality) {
      return res.status(404).json({ message: 'Locality not found' });
    }
    res.status(200).json(locality);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Create a new node
router.post('/node', async (req, res) => {
  try {
    const node = new Node(req.body);
    await node.save();
    await Locality.findByIdAndUpdate(node.localityId, {
      $push: { nodes: node._id }
    });
    res.status(201).send(node);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Get nodes by locality name
router.get('/locality/:localityName/nodes', async (req, res) => {
  const localityName = req.params.localityName;
  console.log("Querying locality with name:", localityName);

  try {
    const locality = await Locality.findOne({ name: localityName });

    if (!locality) {
      return res.status(404).json({ message: 'Locality not found' });
    }

    const nodes = await Node.find({ localityId: locality._id });
    res.status(200).json(nodes);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Create a new signal
router.post('/signal', async (req, res) => {
  try {
    const signal = new Signal(req.body);
    await signal.save();
    await Node.findByIdAndUpdate(signal.nodeId, {
      $push: { signals: signal._id }
    });
    res.status(201).send(signal);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Get signals for a node
router.get('/node/:id/signals', async (req, res) => {
  try {
    const signals = await Signal.find({ nodeId: req.params.id });
    res.status(200).send(signals);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
