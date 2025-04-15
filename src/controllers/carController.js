const router = require('express').Router();
const mapErrors = require('../utils/errorMapper');
const { isGuest, isAuth } = require('../middleware/guard');
const { addCar, getCarByID, getAllCars, getCarByInfo, updateCar, deleteCar, getCarsByCompanyId } = require('../services/carServices');

router.post("/", async (req, res) => {
    const { buildDate, owner, carNumber, phoneNumber, carModel, carMark,carVIN, comanyHoldRepairs } = req.body;
    try {
        const data = await addCar(buildDate, owner, carNumber, phoneNumber, carModel, carMark,carVIN, comanyHoldRepairs);
        res.status(200).json(data)
    } catch (err) {
        console.error(err.message);
        const error = mapErrors(err);
        res.status(400).json({ message: error })
    }
})

// can be replaced by frontend sort fuinc , but is better to use it if we got big DB
router.get('/:mark/:model', async (req, res) => {
    const mark = req.params.mark;
    const model = req.params.model;

    try {
        const data = await getCarByInfo(mark, model);
        res.status(200).json(data);
    } catch (err) {
        console.error(err.message);
        const error = mapErrors(err);
        res.status(404).json({ message: error })
    }
})

router.get("/:carID", async (req, res) => {
    const carID = req.params.carID;
    const companyId = req?.headers["x-company-id"]
    try {
        const car = await getCarByID(carID, companyId);
        res.status(200).json(car);
    } catch (err) {
        console.error(err.message);
        const error = mapErrors(err);
        res.status(404).json({ message: error })
    }
})


router.get("/", async (req, res) => {
    const companyId = req?.headers["x-company-id"]
    try {
        const data = await getCarsByCompanyId(companyId);
        res.status(200).json(data);
    } catch (err) {
        console.error(err.message);
        const error = mapErrors(err);
        res.status(404).json({ message: error })
    }
})


router.post('/update/:carID', async (req, res) => {
    try {
        const { carID } = req.params;
        const { buildDate, owner, carNumber, phoneNumber, carModel, carMark ,carVIN} = req.body;
        const updatedCar = await updateCar(carID, {
            buildDate,
            owner,
            carNumber,
            phoneNumber,
            carModel,
            carMark,
            carVIN,
        });
        res.status(200).json(updatedCar);
    } catch (err) {
        console.error(err.message);
        const error = mapErrors(err);
        res.status(404).json({ message: error })
    }
})

router.delete("/:carID", async (req, res) => {

    try {
        await deleteCar(req.params.carID);
        res.status(200).json({ message: "Successfully delete car" })
    } catch (err) {
        console.error(err.message);
        const error = mapErrors(err);
        res.status(404).json({ message: error })
    }
})

module.exports = router;
