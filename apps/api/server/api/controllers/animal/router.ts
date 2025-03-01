import express from 'express';
import controller from './controller'
export default express.Router()
    .get('/', controller.all)
    .get('/:id', controller.byId)
    .post('/', controller.create)
    .put('/:id', controller.edit)
    .delete('/:id', controller.delete);