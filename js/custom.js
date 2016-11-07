function calcSimplex(){

	// Definição da função que há de ser maximizada
	var funcaoMaxZ = " + 3[x1] + 5[x2]";	// [TO DO]
	// Função responsável por identificar as variáveis
	var variaveis = criaVariaveis(funcaoMaxZ);

	// Criação e definição das restrições
	var restricoes = newMatriz(1, 3);
	criaRestricoes(restricoes);

	// Criação e definição das variáveis de folga ou excesso
	var variaveisFolgaExcesso = new Array();
	criaVariaveisFolgaExcesso(variaveisFolgaExcesso, restricoes);

	// Inserção das variáveis de folga e/ou excesso nas restrições
	insereVariaveisFolga(restricoes, variaveisFolgaExcesso);	

	// Transformação da função em função objetivo
	var funcaoObjetivoZ = transformaFuncao(funcaoMaxZ);

	// Criação da tabela que será usada
	var tabela = newMatriz(1, 2 + variaveis.length + variaveisFolgaExcesso.length + 1);
	preencheTabela(tabela, restricoes, variaveis.length, variaveisFolgaExcesso.length);

}
function preencheTabela(tabela, restricoes, variaveis, variaveisFolgaExcesso){
	/*	

		Colocar as restrições em cada linha;
		Nas primeiras colunas (Base) escrever o nome dos elementos que estão na base; 
		Na ultima coluna (b), escrever o valor dos elementos da base, inicialmente adicionando os valores da restrições; 

		Exemplo:

			Max Z = 3*x1 + 5*x2	=>	Z =	-3*x1 – 5*x2 = 0

			Restrições: 	x1	+	f1	<=	4
							x2	+	f2	<=	6
							3x1	+	2x2	+	f3	<=	18

			Linha	Base	x1	x2	f1	f2	f3	b
			1ª		f1		1	0	1	0	0	4
			2ª		f2		0	1	0	1	0	6
			3ª		f3		3	2	0	0	1	18
			4ª		Z 		-3	-5	0	0	0	0
	*/

	var variaveis = new Array();

	for (var i = 0; i < restricoes.length +1; i++ ){
		var linha = i+1;
		var base = (i == restricoes.length ? "Z" : "f" + (i+1));
		var b = (i == restricoes.length ? 0 : restricoes[i][2]);
		
		for (var j = 0; j < variaveis; j++){
			
		}

	}

}
function criaVariaveis(funcao){

	var iAux;
	iAux = 0;

	var variaveis = new Array();

	for (var i = 0; i < funcao.length; i++){
		if (funcao.substring(i, i+1) == "[")
			iAux = i;

		if (funcao.substring(i, i+1) == "]"){
			if (existeVariavel(variaveis, funcao.substring(iAux+1, i)) == false)
				variaveis.push(funcao.substring(iAux+1, i));
		}
	}

	return variaveis;

}
function existeVariavel(variaveis, variavel){

	var existe = false;

	for (var i = 0; i < variaveis.length; i++){
		if (variaveis[i] == variavel){
			existe = true;
		}
	}
	return existe;
}
function transformaFuncao(funcao){

	var iAux, valor, funcaoAux;
	funcaoAux = "";
	iAux = 0;

	for (var i = 0; i < funcao.length; i++){
		if (funcao.substring(i, i+1) == "]"){
			valor = funcao.substring(iAux, i+1);
			
			if (valor.substring(1, 2) == "+")
				valor = " - " + valor.substring(3);
			else	if(valor.substring(1, 2) == "-")
						valor = " + " + valor.substring(3);

			funcaoAux = "" + funcaoAux + "" + valor;

			iAux = i+1;
		}
	}

	funcaoAux = funcaoAux + " = 0";
	return funcaoAux;
}
function criaRestricoes(res){
	// [TO DO]
	res.push(["1[x1]", "<=", 4]);
	res.push(["1[x2]", "<=", 6]);
	res.push(["3[x1] + 2[x2]", "<=", 18]);
}
function criaVariaveisFolgaExcesso(varFE, res){
	for (var i = 0; i < res.length; i++)
		varFE.push(0);
}
function insereVariaveisFolga(res, varFE){
	for (var i = 0; i < res.length; i++){
		if (res[i][1] == "<=")
			res[i][0] = res[i][0] + " + [f" + (i+1) + "]";
		else
			res[i][0] = res[i][0] + " - [f" + (i+1) + "]";
	}
}