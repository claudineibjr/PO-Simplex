function newMatriz(linhas, colunas){
	// Criando matriz	
	var table = new Array(linhas);

	if (colunas == undefined){
		colunas = linhas;
		linhas = 1;
	}

	var i;
	for (i = 0; i < linhas; i++){
		table[i] = new Array(colunas);
	}
	// Matriz criada
	table.shift()

	//Exemplo de push
	//table.push(["Coluna 1", "Coluna 2"]);
	
	return table;
}

function showMatriz(matriz, bMatriz){
	var linhas, colunas;

	linhas = matriz.length;
	if (bMatriz == true)
		colunas = matriz[linhas-1].length;

	var texto;
	texto = "";

	for (var i=0; i<linhas; i++){
		if (bMatriz == true){
			for (var j=0; j<colunas; j++){
				texto = texto + matriz[i][j] + (j+1 == colunas ? "" : "\t");
			}
			texto = texto + "\n";
		}
		else
			texto = texto + matriz[i] + "\n";
	}

	return texto;
}

function obterValorEntre(valor, marcadorInicial, marcadorFinal){
	var resultado;

	if (marcadorFinal == undefined)	marcadorFinal = -1;

	if (valor.indexOf(marcadorInicial) > -1){
		if (valor.indexOf(marcadorFinal) > -1){
			resultado = valor.substr(valor.indexOf(marcadorInicial)+1, valor.indexOf(marcadorFinal) - valor.indexOf(marcadorInicial)-1)
		}
		else{
			resultado = valor.substr(valor.indexOf(marcadorInicial)+1);
		}
	} else
	resultado = "";
	
	return resultado;
}

function replaceValues(value, valueSubstituted, valueToSubstitute){
	var valueAux;
	valueAux = "";

	for (var i = 0; i < valueSubstituted.length; i++){
		value = (valueAux == "" ? value : valueAux);
		valueAux = "";

		for (var j = 0; j < value.length; j++){
			if (value.substr(j, valueSubstituted[i].length) != valueSubstituted[i]){
				valueAux = valueAux + value.substr(j, valueSubstituted[i].length);
			}
		}
	}

	return valueAux;
}
function truncNum(numero, precisao){
    // Função responsável por exibir após a vírgula o número de casas decimais definido como a precisão
    return ( numero.toString().indexOf("e") > 0 ? numero : numero.toString().substr(0,numero.toString().indexOf(".")+precisao+1));
}