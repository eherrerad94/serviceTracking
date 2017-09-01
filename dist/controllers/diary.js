'use strict';

var _diary = require('../models/diary');

var _diary2 = _interopRequireDefault(_diary);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var listAll = function listAll() {

    return _diary2.default.find().then(function (diaryList) {
        return diaryList;
    }).catch(function (err) {
        return 'Something went wrong';
    });
};

var getOne = function getOne(id) {
    return _diary2.default.findById(id).then(function (diary) {
        return diary;
    }).catch(function (err) {
        return 'Something went wrong';
    });
};

var addOne = function addOne(diary) {
    var newDiary = new _diary2.default(diary);

    return newDiary.save().then(function (diary) {
        console.log("diaryCtrl then", diary);
        return diary;
    }).catch(function (err) {
        console.log("DiaryCtrl ", err);
        var response = {
            message: 'No se pudo agregar una entrada a la agenda',
            error: err.message
        };

        return response;
    });
};

var updateOne = function updateOne(id, newInfo) {

    var byId = { _id: id };
    var query = { $set: newInfo };
    return _diary2.default.update(byId, query).then(function (diary) {
        return diary;
    }).catch(function (err) {
        var response = {
            message: "No se pudieron actualizar la entrada en la agenda",
            error: err.message
        };
        return response;
    });
};

var deleteOne = function deleteOne(id) {
    return _diary2.default.findById(id).then(function (diary) {
        console.log("Delete ", diary);
        if (diary === null) {
            var response = {
                message: 'No se pudo eliminar la entrada de la agenda',
                error: 'Entrada de la agenda con id ' + id + ' no existe'
            };
            return response;
        } else diary.remove().then(function (diary) {
            return diary;
        }).catch(function (err) {
            return "no se pudo";
        });
    }).catch(function (err) {
        var response = {
            message: 'No se pudo eliminar la entrada de la agenda',
            error: 'Entrada de la agenda con id ' + id + ' no existe'
        };
        return response;
    });
};

module.exports = {
    listAll: listAll,
    getOne: getOne,
    addOne: addOne,
    updateOne: updateOne,
    deleteOne: deleteOne
};