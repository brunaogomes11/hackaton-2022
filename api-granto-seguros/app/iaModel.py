import torch

# Criar um modelo de Rede Neural
# Classe Rede Neural
class Net(torch.nn.Module):
    def __init__(self, input_size, hidden_size):
        super(Net, self).__init__()
        self.input_size = input_size
        self.hidden_size = hidden_size
        self.fc1 = torch.nn.Linear(self.input_size, self.hidden_size)
        self.relu = torch.nn.ReLU()
        self.fc2 = torch.nn.Linear(self.hidden_size, 1)
        self.sigmoid = torch.nn.Sigmoid()
    def forward(self, x):
        hidden = self.fc1(x)
        relu = self.relu(hidden)
        output = self.fc2(relu)
        output = self.sigmoid(output)
        return output

def predict(dados):
  for i in range(0,len(dados)):
    if dados[i] < 1:
      dados[i] = dados[i] / 1
    elif dados[i] < 10:
      dados[i] /= 10
    elif dados[i] < 100:
      dados[i] /= 100
    elif dados[i] < 1000:
      dados[i] /= 1000
    elif dados[i] < 10000:
      dados[i] /= 10000
    elif dados[i] < 100000:
      dados[i] /= 100000
    elif dados[i] < 1000000:
      dados[i] /= 1000000
    else:
      print('Erro')
  entrada = torch.FloatTensor(dados)
  # print(entrada)
  # print(entrada.size())
  input_size = entrada.size()[0]
  hidden_size = 23
  modelo = Net(input_size, hidden_size)
  modelo.load_state_dict(torch.load('app/modelo/modeloTreinado.pth'))
  modelo.eval()
  y_pred = modelo(entrada)
  y_pred = y_pred.detach().numpy()
  y_pred = round(y_pred[0])
  return y_pred