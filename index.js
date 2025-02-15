// fsモジュールをインポート
const fs = require("fs/promises");
//RCRSLogのプロトコルバッファー変換ファイルをインポート
//npm install google-protobuf
const { LogProto } = require("./RCRSLogProto_pb");

const fetchLogData = async () => {
    //ファイルパス
    const filePath = "./filepath";

    //出力ファイルパス
    const outputFilePath = "./out.json";

    try {
        //ファイルの読み込み
        const buf = await fs.readFile(filePath);
        console.log("\n読み込めた\n================================\n");

        //符号なし8ビット配列として新規作成
        const log = new Uint8Array(buf);
        //生のバイナリを表示
        console.log("生データ\n");
        console.log(log);
        console.log("\n================================\n");

        //LogProtoオブジェクトの作成
        const decodedLog = LogProto.deserializeBinary(log);

        //LogProtoオブジェクトを表示
        console.log("デシリアライズ\n");
        console.log(decodedLog);
        console.log("\n================================\n");

        console.log("デシリアライズオブジェクト\n");
        console.log(decodedLog.toObject());
        console.log("\n================================\n");

        // 出力
        const jsonData = JSON.stringify(decodedLog.toObject(), null, 2);
        await fs.writeFile(outputFilePath, jsonData);
    } catch (error) {
        console.log("読み込めなかった", error);
        return null;
    }
};

fetchLogData();
