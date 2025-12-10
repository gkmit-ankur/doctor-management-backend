const express = require('express');
const { clinicController } = require('../controllers');
const { clinicValidator } = require('../validators');
const { validate } = require('../middlewares/validation.middleware');
const router = express.Router();

router.post('/clinics', validate(clinicValidator.createClinicSchema), clinicController.createClinic);
router.get('/clinics', validate(clinicValidator.clinicQuerySchema, 'query'), clinicController.getClinics);
router.get('/clinics/:clinicId', validate(clinicValidator.clinicIdParamSchema, 'params'), clinicController.getClinicById);
router.put('/clinics/:clinicId', validate(clinicValidator.clinicIdParamSchema, 'params'), validate(clinicValidator.updateClinicSchema), clinicController.updateClinic);
router.delete('/clinics/:clinicId', validate(clinicValidator.clinicIdParamSchema, 'params'), clinicController.deleteClinic);

module.exports = router;