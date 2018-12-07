# cloud9で開発する場合

## cloud9にアクセス

AMIから作成した
- ec2インスタンスのGIP
- ec2-user / 22 port

を入力。

public pemをコピーした後に
sshでec2インスタンスにアクセス。 
対象のpublic keyを貼り付ける
```
ssh -i pem ec2-user@GIP
vim .ssh/authorized_keys
```
~/environment 以下のファイルがGUI上にマウントされています。

## 開発方法

### 1.サーバーの起動方法

```
cd othello/src
python3 main.py
```
でサーバーの実行をします

終了する場合は`ctrl + c`,バックグラウンド実行をしたい場合は
```
python3 main.py &
```
を実行しましょう

### 2.web上から確認

1. console上に表示される標準出力を見る
2. web上から確認する
    - http://{yourip}:8080/html/othell.thml
    - ヘッダーの上の`preview`から確認

### 3.othelloの操作方法

1. Manual vs Manual の場合
    - whiteもblackもManualを選択して`start`
2. Manual vs Auto の場合
    - whiteかblackのどちらかは`manual`を選択,どちらか一方は他のユーザーを選択
3. Auto vs Auto の場合
    - whiteもblackもmanual以外のユーザーを選択
    - gamesを選択すると自動的に対戦が始まります
    - `Othello Results`に対戦結果が表示されます

### 4.ユーザーの追加方法

1. /html/user-edit.htmlに遷移して任意のユーザーを作成してください
2. 作成後、オセロユーザーを新たに選択できます

### 5.AIの編集方法

- `src/app/models/processes/othello_intelligence.py` にオセロAIの実態があります
- 仕組みはオセロの盤面情報を受け取り、最適打を返す、というものになります
```
input                                  output

[0, 0, 0, 0, 0, 0, 0, 0],                   next_move:{  
[0, 0, 0, 0, 0, 0, 0, 0],                       'x': 2,
[0, 0, 0, 9, 1, 9, 0, 0],                       'y': 4
[0, 0, 0, 1, 1, 0, 0, 0],                   }
[0, 0, 0, 2, 1, 9, 0, 0], 
[0, 0, 0, 0, 0, 0, 0, 0], 
[0, 0, 0, 0, 0, 0, 0, 0], 
[0, 0, 0, 0, 0, 0, 0, 0]        ->     

current_user:2
```
- 0: 何も置いていない 1,2:ユーザーの駒 9:次に置けるマス
- はじめに記載されているロジックは配列のはじめに発見した置けるマスを返します

### 6.オセロのルールに基づいて最適打を探す

深読みをしようとする場合、 (x,y)に置いた場合、次はどの手を打つことはできるのか？ということを考える必要があります。

`src/app/models/processes/othello.py`にオセロのルールをコントロールするclassが存在します。

以下のような振る舞いをします
```
input

current_othello_board
[0, 0, 0, 0, 0, 0, 0, 0], 
[0, 0, 0, 0, 0, 0, 0, 0], 
[0, 0, 0, 9, 1, 9, 0, 0], 
[0, 0, 0, 1, 1, 0, 0, 0], 
[0, 0, 0, 2, 1, 9, 0, 0], 
[0, 0, 0, 0, 0, 0, 0, 0], 
[0, 0, 0, 0, 0, 0, 0, 0], 
[0, 0, 0, 0, 0, 0, 0, 0]

next_move = {
            'x': x,
            'y': y
        }

current_turn:1


↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓

output

{
    'nextOthelloBoard': 次のオセロの盤面,
    'nextTurn': 次のオセロ番です,
    'validation': next_moveが有効打に含まれているかを確認します。入っていない場合は {'isValid': false, 'text':'next_move is not included possible moves. Please input correct cells'}を返します,
    'isSkipped': スキップが行われた場合、 trueになります,
    'isFinished': ゲームが終了したかどうかを返します,
    'white': 白(1)の個数,
    'black': 黒(2)の個数,
    'possibleMoves': 有効打の個数
}

```

### 7.テスト方法 by スクリプト

1. `test_dispacher.py`と`test_othello.py`を実行しましょう
```
cd ~/environment/src
python3 test_dispacher.py
test_othello.py
```
### 7.テスト方法 by 手動
webブラウザから実際にオセロとして戦ってみましょう。


# ローカルで開発する場合

必要なM/W入れてください

## setup.shの実行
`setup.sh`はcentos用のスクリプトです

## 仮想環境の構築
1. cd othello ; python3 -m venv .venv
2. . ./.venv/bin/activate


