const { Todo } = require("../models");

// test용 api
exports.getIndex = (req, res) => {
  res.send("response from api server [GET /api-server]");
};

exports.getUser = (req, res) => {
  res.send("response from api user [GET /api-server/user]");
};

// GET /api-server/todos
exports.getTodos = async (req, res) => {
  try {
    const todoAll = await Todo.findAll(); // [{id, text, done}] 배열 형태로 반환
    res.json(todoAll);
  } catch (err) {
    console.log("server error");
    res.status(500).send("SERVER ERROR!!, 관리자에게 문의하새요");
  }
};

// POST /api-server/todo
exports.postTodo = async (req, res) => {
  /*
  {id: 모델 정의시 auto_increment 속성으로 추가해두었기 때문에 클라이언트로부터 받아올 필요x 
  text: 클라이언트로부터 받아와야 함
done: 모델 정의시 false(0)으로 defaultValue로 설정해두었기 때문에 클라이언트로부터 받아올 필요x 
}
  */
  const { text } = req.body;
  await Todo.create({
    text,
  });
  res.send({ isSuccess: true });
  try {
  } catch (err) {
    console.log("server error");
    res.status(500).send("SERVER ERROR!!, 관리자에게 문의하새요");
  }
};
