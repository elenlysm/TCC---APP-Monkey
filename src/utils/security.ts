//Função para ocultar parcialmente dados sensíveis, como números de cartão ou CPF

export function maskSensitiveData(data: string): string {
    if (data.length <= 4) return '****'; //Se a string tiver 4 caracteres ou menos, retorna tudo mascarado
    return data.slice(0, -4).replace(/./g, '*') + data.slice(-4); //Caso contrário, substitui todos os caracteres (exceto os 4 últimos) por asteriscos
}

