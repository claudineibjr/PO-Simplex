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