const { Deck } = require("../../models");

module.exports = {
// *  카테고리 생성 이후  덱 타이틀 생성 부분입니다.
  post: (req, res) => {
    console.log(req.body);
 
    //! 조건문은 없어도 작동은 되지만 일단 붙이고, 추후에 제거 예정)
 if (req.body.category_id && req.body.user_id && req.body.title) {
    Deck.findOne({
      where: {
        category_id: `${req.body.category_id}`,
        title: `${req.body.title}`, //? 타이틀 내용이 있는지 확인 (중복검사)           ex)  grammar master
      }
    })
      .then(data => {
        if (data) {
          console.log(data.dataValues, "category exists"); // ! 카테고리가 존재할 때 덱 이름만 추가 한다. (카테고리 id = 1)
      
            res.status(201).json(data.dataValues);
          
          // res.status(200).json(data.dataValues)
          // console.log('저장되어 있는 내용 보여준다.', data.dataValues)
        } else {
          //Todo: 중복되지 않는다면 디비에 덱 타이틀 추가 (클라이언트와 연계 후 추가할 부분 수정)
          console.log(req.body ,"it's a new category"); 
          // ! 카테고리를 새로 만든다. 기존 카테고리 값과 다르면 누적 카테고리 id + 1
          Deck.create({
            user_id: `${req.body.user_id}`, //? 유저 아이디 추가(어떤 유저가 추가했는지 디비에 저장필요)
            category_id: `${req.body.category_id}`,
            title: `${req.body.title}`,//? 덱 타이틀 추가          
           // author: `${req.body.author}`
          }).then(data => {
            console.log(data, "datata")
            res.status(201).json(data.dataValues);
          });
        }
      })
      .catch(err => {
        console.error(err);
      });
    //}
  }
},




}

// todo:  카테고리 수정시 컬럼 id가 다른문제, user_id가 같은 경우 전부 수정되는 문제 ..해결중..

// /* eslint-disable */
// const { Deck } = require('../../models')
// // *  카테고리 생성 이후  덱 타이틀 생성 부분입니다.
// module.exports = {
//     //  todo: get요청시는 이미 category.js에 있으므로 따로 만들 필요는 없어 보인다.
//     //  todo: post요청시에는 특별한 요청에 따른 정보를 보여준다.
//     post: (req, res) => {
//         console.log(req.body)
//         //if (req.body.category && req.body.title && req.body['user_id']) {
//         Deck.findOne({
//             where: {
//                 category: `${req.body.category}`, //(민경)추가
//                 //user_id: `${req.body.user_id}`, //? 유저 아이디에 맞는 데이터를 줘야한다.    ex)   1 or woody
//                 //title: `${req.body.title}`, //? 타이틀 내용이 있는지 확인 (중복검사)           ex)  grammar master
//             },

//         })
//         //todo : 현재 충돌되도 똑같이 추가되는 상황(카테고리가 달라도 덱 타이틀은 같을 수 있다.
//         //todo : 카테고리에 조건을 걸어서 같은 카테고리에서는 중복 타이틀이 추가 안되도록 수정해야한다.
//         .then(data => {
//                 if (data) {
//                     console.log('category exists')
//                     Deck.create({
//                         category: `${req.body.category}`,
//                         title: `${req.body.title}`, //? 덱 타이틀 추가
//                         user_id: `${req.body.user_id}`, //? 유저 아이디 추가(어떤 유저가 추가했는지 디비에 저장필요);

//                     }).then(data => {

//                 if(data){
//                             let category_id = req.body.category_id
//                             Deck.increment({ category_id : 1}, { where : {category : req.body.category}})
//                         res.status(201).json(data.dataValues)
//                     } else{

//                     }

//                     })
//                     // res.status(200).json(data.dataValues)
//                     // console.log('저장되어 있는 내용 보여준다.', data.dataValues)

//                 } else {  // ! 카테고리가 중복 되지 않는다.

//                     //Todo: 중복되지 않는다면 디비에 덱 타이틀 추가 (클라이언트와 연계 후 추가할 부분 수정)
//                     console.log("it's a new category")
//                     Deck.create({
//                         category: `${req.body.category}`, //(민경)추가
//                         title: `${req.body.title}`, //? 덱 타이틀 추가
//                         user_id: `${req.body.user_id}`, //? 유저 아이디 추가(어떤 유저가 추가했는지 디비에 저장필요)

//                     }).then(data => {
//                         console.log(req.body.category, "추가할 카테고리");
//                         console.log(data.dataValues.category, "기존에 있는 카테고리");
//                         console.log(data.dataValues)
//                         Deck.findAll({attributes: ['category', 'category_id']}).then(data => console.log(data[0].dataValues, "뭐냐"))
//                         console.log(data[0].dataValues.categpry, "korea");

//                         if(req.body.category !== data.dataValues.category){  // 추가하는 카테고리와, 기존 카테고리가 다를 경우
//                             Deck.increment({ category_id : 1}, { where : {category : req.body.category}})
//                         res.status(201).json(data.dataValues)
//                     } else{

//                     }
//                 })
//                 }
//             })
//             .catch(err => {
//                 console.error(err)
//             })
//         //}
//     },
// }
