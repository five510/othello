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

`python3 main.py`で実行


# ローカルで開発する場合

必要なM/W入れてください

## setup.shの実行
`setup.sh`はcentos用のスクリプトです

## 仮想環境の構築
1. cd othello ; python3 -m venv .venv
2. . ./.venv/bin/activate


