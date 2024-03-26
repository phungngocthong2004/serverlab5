const express = require('express');

const router = express.Router();
const mongoose = require('mongoose');

const drinkModel = require('./drinkmodel');
const DB=require('./db');

router.get('/list', async (_req, res) => {
    await mongoose.connect(DB.uri);

    let dink = await drinkModel.find();

    console.log(dink);

    res.send(dink);
});
router.post('/adddinks', async (req, res) => {
    try {
        
        await mongoose.connect(DB.uri);
        console.log(req.body);
        const { name } = req.body;
        
        const dink = new drinkModel({
            name: name, 
        });
        await dink.save();
        res.status(201).send(' đã được thêm thành công');
    } catch (err) {
        console.error('Lỗi khi thêm vào MongoDB:', err);
        res.status(500).send('Đã xảy ra lỗi khi thêm ');
    }
});
router.put('/updatedrink/:id', async (req, res) => {
    try {
        await mongoose.connect(DB.uri);
        const { name } = req.body;
        const DinkId = req.params.id;
        const dinks = await drinkModel.findById(DinkId);
        // Nếu sinh viên không tồn tại, trả về mã lỗi 404
        if (!dinks) {
            return res.status(404).json({ message: 'Không tìm thấy sinh viên' });
        }
        // Cập nhật thông tin sinh viên
        dinks.name = name;
       
        // Lưu thông tin sinh viên đã được cập nhật
        await dinks.save();

        // Trả về thông báo thành công
        res.status(200).json({ message: 'Cập nhật thông tin nthành công' });
    } catch (err) {
        console.error('Lỗi khi cập nhật  vào MongoDB:', err);
        res.status(500).json({ message: 'Đã xảy ra lỗi khi cập nhật ' });
    }
});
router.delete('/deletedink/:id', async (req, res) => {
    try {
        await mongoose.connect(DB.uri);
        const DrinkId = req.params.id;

        const dinks = await drinkModel.findByIdAndDelete(DrinkId);

        // If no student is found, return a 404 error
        if (!dinks) {
            return res.status(404).json({ message: 'Không tìm thấy ' });
        }

        // Return a success message
        res.status(200).json({ message: 'Xóa  thành công' });
    } catch (err) {
        console.error('Lỗi khi xóa  từ MongoDB:', err);
        res.status(500).json({ message: 'Đã xảy ra lỗi khi xóa ' });
    }
});
router.get('/searchdink', async (req, res) => {
    try {
        const key = req.query.key;
  
        const data = await drinkModel.find({ name: { $regex: key, $options: 'i' } }).sort({ createdAt: -1 });
  
        if (data && data.length > 0) {
            res.json({
                "status": 200,
                "messenger": 'Thành công',
                "data": data
            });
        } else {
            res.json({
                "status": 200,
                "messenger": 'Không tìm thấy dữ liệu',
                "data": [] // Trả về một mảng rỗng khi không tìm thấy kết quả
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            messenger: 'Lỗi, thất bại',
            data: []
        });
    }
});
module.exports = router;