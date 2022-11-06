from app.iaModel import predict
import os
from flask import Flask, jsonify, request

app = Flask(__name__)

@app.route('/', methods=["GET"])
def servidorLigado():
    return "Servidor Rodando"

@app.route("/testar", methods=["POST"])
def criarModelos():
    request.data = request.get_json()
    if request.data:
        genero = request.data['Genero']
        idade = request.data['Idade'] 
        debito = request.data['Debito'] 
        casado = request.data['Casado'] 
        contaBanco = request.data['Possui_Conta_Banco']
        tipo_industria = request.data['Tipo_Industria'] 
        etnia = request.data['Etnia']
        anos_empregado = request.data['Anos_Empregado'] 
        inadimplencia = request.data['Inadimplente'] 
        empregado = request.data['Empregado']
        pont_credito = request.data['Pontuacao_Credito']
        cnh = request.data['Habilitado']
        cidadania = request.data['Cidadania']
        cep = request.data['Codigo_Postal']
        renda = request.data['Renda']
        dados = [genero, idade, debito, casado, contaBanco, tipo_industria, etnia, anos_empregado, inadimplencia, empregado, pont_credito, cnh, cidadania, cep, renda]
        aprovado = predict(dados)
        return jsonify({'Aprovado':f'{aprovado}'}) 

if __name__ == '__main__':
    app.run(debug=True, port=int(os.environ.get('PORT', 5000)))