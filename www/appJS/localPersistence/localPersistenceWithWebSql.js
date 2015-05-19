/*
 * 这是使用 WebSql 在浏览器中构建的内置数据库来做一些前端特征限制的数据存储的东西
 * 1.创建数据库 NncqWebDB ；
 * 2.创建存储本地用户的数据库表 LogonLocalUser；
 * 3.相应的 CURD 方法；
 */

var webStorage = {};
webStorage.webSql = function () {
    var _this = this;
    // 数据库
    var _dataBase;

    // 打开数据库连接或者创建数据库
    this.openDatabase = function () {
        if (!!_dataBase) {
            return _dataBase;
        }
        _dataBase = openDatabase("NncqWebDB", "1.0", "内置页面数据库", 1024 * 1024, function () { });
        return _dataBase;
    },

    // 创建数据表
    this.createTable = function () {
        var dataBase = _this.openDatabase();
        // 创建表
        dataBase.transaction(function (tx) {
            tx.executeSql("create table if not exists LogonLocalUser (userID TEXT UNIQUE, userName TEXT, userStatus TEXT)",[] );});
    }

    // 添加数据
    this.insert = function (uID,uName,uStatus) {
        var dataBase = _this.openDatabase();
        dataBase.transaction(function (tx) {
            tx.executeSql("insert into LogonLocalUser (userID, userName, userStatus) values(?, ?, ?)",[uID, uName,uStatus]);});
    }

    // 查询结果
    this.query = function () {
        var dataBase = _this.openDatabase();
        dataBase.transaction(function (tx) {
            tx.executeSql("select * from LogonLocalUser", [],
            function (tx, result) {
                // 遍历数据集合
                for (var i = 0; i < result.rows.length; i++) {
                    // 这里可以做一些其他的事情了
                    var uID = result.rows.item(i)['userID'];
                    var uName = result.rows.item(i)['userName'];
                    var uStatus = result.rows.item(i)['userStatus'];
                }
            });
        });
    }

    //更新数据
    this.update = function (uID,uName,uStatus) {
        var dataBase = _this.openDatabase();
        dataBase.transaction(function (tx) {
            tx.executeSql("update LogonLocalUser set userName = ? where userID= ?",[uName, uID]);
        });
    }

    //删除数据
    this.del = function (uID) {
        var dataBase = _this.openDatabase();
        dataBase.transaction(function (tx) {
            tx.executeSql("delete from  LogonLocalUser where userID= ?",[uID]);
        });
    }

    //删除数据表
    this.dropTable = function () {
        var dataBase = _this.openDatabase();
        dataBase.transaction(function (tx) {
            tx.executeSql('drop  table  LogonLocalUser');
        });
    }
    
    // 根据用户ID判断是否存在保存的 ID
    this.getUserID = function(uID){
         var dataBase = _this.openDatabase();
        dataBase.transaction(function (tx) {
            tx.executeSql("select * from LogonLocalUser where userID=?", [uID],
            function (tx, result) {
                if(result.rows>0){
                    return true;
                }else{
                    return false;
                }
            });
        });       
    }
    
    // 提取当前的用户ID
    this.getUserID = function(){
         var dataBase = _this.openDatabase();
        dataBase.transaction(function (tx) {
            tx.executeSql("select * from LogonLocalUser", [],
            function (tx, result) {
                if(result.rows>0){
                    return result.rows.item(0)['userID'];
                }else{
                    return '';
                }
            });
        });       
    }

}