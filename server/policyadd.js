var addpolicyraw = () => {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("policies");
        var myobj = { title: , text:  };
        dbo.collection("customers").insertOne(myobj, function(err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            db.close();
        });
    });
}

var addpolicypdf = () => {

}
