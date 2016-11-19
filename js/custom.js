function calcSimplex(){

	// - Definição da função que há de ser maximizada
	// - Criação e definição das restrições
	if (debug == true){
		var funcaoMaxZ = "{+} <3> [x1] {+} <5> [x2]";
		var restricoes = criaRestricoes();
	} else {
		var funcaoMaxZ = inputedFunction;
		var restricoes = restrictions;
	}

	// Função responsável por identificar as variáveis
	var variaveis = criaVariaveis(funcaoMaxZ);

	// Criação e definição das variáveis de folga ou excesso
	var variaveisFolgaExcesso = new Array();
	criaVariaveisFolgaExcesso(variaveisFolgaExcesso, restricoes);

	// Inserção das variáveis de folga e/ou excesso nas restrições
	insereVariaveisFolga(restricoes, variaveisFolgaExcesso);	

	// Transformação da função em função objetivo
	var funcaoObjetivoZ = transformaFuncao(funcaoMaxZ);

	// Criação da tabela que será usada
	var tabela = newMatriz(1, 5);
	preencheTabela(tabela, restricoes, variaveis, variaveisFolgaExcesso, funcaoObjetivoZ);

	createVisualTable(tabela);
	
}
function preencheTabela(tabela, restricoes, variaveis, variaveisFolgaExcesso, maxZ){
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

	for (var i = 0; i < restricoes.length + 1; i++ ){
		var linha = i+1;
		var base = (i == restricoes.length ? "Z" : "f" + (i+1));
		var b = (i == restricoes.length ? "<0>" : restricoes[i][2]);
		var variavel = new Array();
		var variavelFolgaExcesso = new Array();		
		
		for (var j = 0; j < variaveis.length; j++){
			variavel.push((i == restricoes.length ? preencheTabela_Aux(variaveis[j], maxZ) : preencheTabela_Aux(variaveis[j], restricoes[i][0], false)));
		}
		for (var j = 0; j < variaveisFolgaExcesso.length; j++){
			variavelFolgaExcesso.push((i == restricoes.length ? preencheTabela_Aux(variaveisFolgaExcesso[j], maxZ) : preencheTabela_Aux(variaveisFolgaExcesso[j], restricoes[i][0], false)));
		}
		
		tabela.push([linha, base, variavel, variavelFolgaExcesso, b]);
		//console.log("Linha: " + linha + "\nBase: " + base + "\n" + showMatriz(variavel, false) + showMatriz(variavelFolgaExcesso, false) + "B: " + b);
	}
}
function preencheTabela_Aux(variavel, restricao){
	var iAux, resultado, iAux2;
	iAux = 0;
	iAux2 = 0;

	resultado = "<0>";

	for (var i = 0; i < restricao.length; i++){
		if (restricao.substring(i, i+1) == "[")
			iAux = i;
		if (restricao.substring(i, i+1) == "]"){
			var varAux;
			varAux = restricao.substring(i+1, iAux);
			varAux = varAux.replace("[", "");	varAux = varAux.replace("]", "");

			if (varAux == variavel){
				resultado = restricao.substring(iAux, iAux - i)
				resultado = resultado.substring(resultado.lastIndexOf("{"), resultado.lastIndexOf("}")+1) + " " + resultado.substring(resultado.lastIndexOf("<"));
			}
		}
	}

	return resultado;
}
function criaVariaveis(funcao){
	var variaveis = new Array();

	for (var i = 0; i < funcao.length; i++){
		var varAux = funcao.substring(i);
		varAux = obterValorEntre(varAux, "[", "]");

		if (varAux != "")
			if (existeVariavel(variaveis, varAux) == false)
				variaveis.push(varAux);
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
	var funcaoAux;
	funcaoAux = funcao;

	for (var i = 0; i < funcao.length; i++)
		funcaoAux = funcaoAux.replace("{+}", "{-}");

	funcaoAux = funcaoAux + " = 0";
	return funcaoAux;
}
function criaRestricoes(){
	// [TO DO]
	var res = newMatriz(1, 3);
	res.push(["{+} <1>[x1]", "<=", "{+} <4>"]);
	res.push(["{+} <1>[x2]", "<=", "{+} <6>"]);
	res.push(["{+} <3>[x1] {+} <2>[x2]", "<=", "{+} <18>"]);
	return res;
}
function criaVariaveisFolgaExcesso(varFE, res){
	for (var i = 0; i < res.length; i++)
		varFE.push("f" + (i+1));
}
function insereVariaveisFolga(res, varFE){
	for (var i = 0; i < res.length; i++){
		if (res[i][1] == "<=")
			res[i][0] = res[i][0] + " {+} <1>[f" + (i+1) + "]";
		else
			res[i][0] = res[i][0] + " {-} <1>[f" + (i+1) + "]";
	}
}

function showMatriz(matriz){
	var linhas, colunas;

	linhas = matriz.length;
	colunas = matriz[linhas-1].length;

	var texto;
	texto = "";

	for (var i=0; i<linhas; i++){
		for (var j=0; j<colunas; j++){
			texto = texto + matriz[i][j] + (j+1 == colunas ? "" : "\t");
		}
		texto = texto + "\n";
	}

	return texto;
}	