const express = require('express');
const { clinicController } = require('../controllers');
const router = express.Router();

router.post('/clinics', clinicController.createClinic);
router.get('/clinics', clinicController.getAllClinics);
router.get('/clinics/:clinicId', clinicController.getClinicById);
router.put('/clinics/:clinicId', clinicController.updateClinic);
router.delete('/clinics/:clinicId', clinicController.deleteClinic);

module.exports = router;