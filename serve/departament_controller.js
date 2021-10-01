const { Router } = require('express');
let express = require('express');
let router = express.Router();
let Departament = require('./departament');
let Product = require('./products');

router.post('/', (req, res) => {
    console.log(req.body);
    let departament = new Departament({ name: req.body.name });
    departament.save((err, dep) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(dep);
        }
    })
});

router.get('/', (req, res) => {
    Departament.find().exec((err, deps) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(deps);
        }
    })
});
router.delete('/:id', async (req, res) => {

    try {
        let id = req.params.id;
        let prods = await Product.find({ departaments: id }).exec();
        if (prods.length >0){
            res.status(500).send({msg: 'Not Permited Dell departament in use'})
        } else {
           await Departament.deleteOne({ _id: id });
           res.status(200).send({});
        }

    } catch(err) {
        res.status(500).send({msg: 'Not Permited'});
    }
});

router.patch('/:id', (req, res) => {
    Departament.findById(req.params.id, (err, dep) => {
        if (err) {
            res.status(500).send(err);
        } else if (!dep) {
            res.status(404).send({});
        } else {
            dep.name = req.body.name;
            dep.save()
                .then((d) => { res.status(200).send(d) })
                .catch((e) => { res.status(500).send(e) });
        }
    })
})
module.exports = router;
