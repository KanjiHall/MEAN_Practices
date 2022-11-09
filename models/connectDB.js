const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/HeroDB');

const Schema = mongoose.Schema;

const HeroSchema = new Schema({
    id: Number,
    name: String,
}, {
    collection: 'Heroes'
});

const HeroModel = mongoose.model('heroes', HeroSchema);

// find all heroes named 'Kanji Hall' and id = 11
// Hàm find là hàm tìm kiếm theo điều kiện
HeroModel.find({ name: 'Kanji Hall', id: 11 })
    .then(data => {
        console.log(data);
    })
    .catch(err => {
        console.log("Lỗi", err);
    });


// Hàm create để thêm vào file
HeroModel.create({
    id: 23,
    name: 'Mai Thị Thảo Nguyên'
}).then(data => {
    console.log('Create Thành công');
}).catch(err => {
    console.log(err);
})

// Hàm Update để cập nhật giá trị   
HeroModel.updateOne({
    id: 2,
    name: 'Songohan'
},{
    name: 'Mochi-Mochi'
}).then(data => {
    if(data['matchedCount']){
        console.log("Update thành công", data);
    }else{
        console.log("Update thất bại", data);
    }

}).catch(err => {
    console.log("Error: ", err);
});

//Hàm delete để xóa đối tượng trong mongodb

HeroModel.deleteOne({
    id: 23,
    name: 'Mai Thị Thảo Nguyên'
}).then(data => {
    if(data['deletedCount']){
        console.log("Delete Thành Công", data);
    }else{
        console.log("Delete Thất Bại");
    }
})
