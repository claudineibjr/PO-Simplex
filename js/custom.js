const COLUNA_VARIAVEIS = 1;
const COLUNA_FOLGAEXCESSO = 2;

function calcSimplex(){

	// - Definição da função que há de ser maximizada
	// - Criação e definição das restrições
	var funcaoMaxZ = inputedFunction;
	var restricoes = restrictions;

	// Função responsável por identificar as variáveis
	var variaveis = criaVariaveis(funcaoMaxZ);

	// Criação e definição das variáveis de folga ou excesso
	var variaveisFolgaExcesso = new Array();
	criaVariaveisFolgaExcesso(variaveisFolgaExcesso, restricoes);

	// Inserção das variáveis de folga e/ou excesso nas restrições
	insereVariaveisFolga(restricoes, variaveisFolgaExcesso);	

	// Transformação da função em função objetivo
	var funcaoObjetivoZ = transformaFuncao(funcaoMaxZ);

	// Criação da tabela e do cabeçalho da tabela que será usada
	var tabela = newMatriz(1, 2 + variaveis.length + variaveisFolgaExcesso.length), cabecalho = new Array();
	preencheTabela(tabela, restricoes, variaveis, variaveisFolgaExcesso, funcaoObjetivoZ);
	criaCabecalho(cabecalho, variaveis.length, variaveisFolgaExcesso.length);

	ajustaTabela(tabela);

	// Exibe a tabela criada visualmente
	createVisualTable(tabela, cabecalho);

	/* Iterações
		 - Condição de parada: Quando nenhum valor da base Z for negativo

		 - Troca dos valores
			Quem entra na base: É a váriavel com o menor coeficiente na linha de Z
			Quem sai da base: Menor positivo da divisão
				Que divisão? Coluna B/Quem entra
		 
		 - Transformação de Matriz
			Operações para tornar a coluna da novaBase em um vetor identidade com o elemento 1 na segunda coluna. 
				1ª operação:	Dividir Cada elemento da linha que entrou na Base pelo Pivô
				2ª operação: 	Deixar nulo os outros elementos da linha
					Todos os elementos da linha utilizada como base * (valor a zerar * -1) + linha a zerar

	*/
	//for (var eita = 0; eita < 3; eita++ ){
	while(valorNegativo(tabela[tabela.length-1], 1) == true){

		// Define quem entra e quem sai da base
		var novaBase = menorCoeficiente(tabela[tabela.length-1], cabecalho, 1);
		var antigaBase = menorPositivoDivisao(tabela, novaBase, cabecalho, 1, variaveis.length, variaveisFolgaExcesso.length);
		tabela[antigaBase][0] = cabecalho[novaBase];

		// Define o pivô para transformar a coluna da nova base em um vetor identidade
		if (novaBase - variaveis.length >= -1 )
			var pivo = parseFloat(tabela[antigaBase][COLUNA_VARIAVEIS][novaBase-COLUNA_VARIAVEIS]);
		else
			var pivo = parseFloat(tabela[antigaBase][COLUNA_FOLGAEXCESSO][novaBase-COLUNA_FOLGAEXCESSO]);

		// Anulação dos outros elementos da coluna da base que entrou
		for (var i = 1; i < tabela[0].length; i++){
			if (typeof tabela[antigaBase][i] == "object")
				for (var j = 0; j < tabela[antigaBase][i].length; j++ ){
					var tempValor = parseFloat(tabela[antigaBase][i][j]);
					tabela[antigaBase][i][j] = parseFloat(tempValor/pivo);
				}
			else{
				var tempValor = parseFloat(tabela[antigaBase][i]);
				tabela[antigaBase][i] = parseFloat(tempValor/pivo);
			}
		}

		// Deixar nulo os outros elementos da linha
		for (var i = 0; i < tabela.length; i++){
			if (i != antigaBase){
				var valorAZerar = parseFloat((typeof tabela[i][novaBase] == "object" ? (novaBase - variaveis.length >= -1 ? tabela[i][COLUNA_VARIAVEIS][novaBase-COLUNA_VARIAVEIS] : tabela[i][COLUNA_FOLGAEXCESSO][novaBase-COLUNA_FOLGAEXCESSO]) : tabela[i][novaBase] ));
				if (valorAZerar != 0){
					for (var j = 1; j < tabela[i].length; j++ ){
						if (typeof tabela[i][j] == "object")
							for (var prof = 0; prof < tabela[i][j].length; prof++ )
								tabela[i][j][prof] = parseFloat(parseFloat(tabela[antigaBase][j][prof] * (valorAZerar*-1)) + parseFloat(tabela[i][j][prof]));
						else
							tabela[i][j] = parseFloat(parseFloat(tabela[antigaBase][j] * (valorAZerar*-1)) + parseFloat(tabela[i][j]));
					}
				}
			}
		}


		// Exibe a tabela criada visualmente
		createVisualTable(tabela, cabecalho);		
	}

	createDivWell(tabela);
	
}
function ajustaTabela(tabela){
	for (var linha = 0; linha < tabela.length; linha++){
		for (var coluna = 0; coluna < tabela[linha].length; coluna++){
			if (typeof tabela[linha][coluna] == "object")
				for (var profundidade = 0; profundidade < tabela[linha][coluna].length; profundidade++ )
					tabela[linha][coluna][profundidade] = replaceValues(tabela[linha][coluna][profundidade], ["{", "}", "<", ">", "[", "]", " ", "+"], "");
			else
				tabela[linha][coluna] = replaceValues(tabela[linha][coluna], ["{", "}", "<", ">", "[", "]", " ", "+"], "");
		}
	}
}
function menorPositivoDivisao(tabela, novaBase, cabecalho, aPartirDe, variaveisAdicionais, variaveisFolgaExcessoAdicionais){
	var menor = 1000000, oMenor;
	var valorB, valorBase, colunaReal = 0;

	var colunaObjetivo = 1 + variaveisAdicionais + variaveisFolgaExcessoAdicionais;

	for (var coluna = 0; coluna < tabela[0].length; coluna++, colunaReal++){
		if (typeof tabela[0][coluna] == "object")
			colunaReal++
	}
	
	var colunaBase = criaColunaBase(tabela, novaBase, variaveisAdicionais, variaveisFolgaExcessoAdicionais);

	for (var coluna = 0; coluna <= colunaReal; coluna++){
		if (coluna == colunaObjetivo){
			for (var linha = 0; linha < tabela.length-1; linha++){
				valorB = parseFloat(String(tabela[linha][coluna - 3]));
				valorBase = parseFloat(String(colunaBase[linha]));

				//alert("Valor B: " + valorB + "\n\nValorBase: " + valorBase);

				if (valorBase > 0){
					var divisao = valorB / valorBase;
					if (divisao < menor){
						menor = divisao;
						oMenor = linha;
					}
				}

			}
		}
	}
	return oMenor;
}
function criaColunaBase(tabela, colunaBase, variaveisAdicionais, variaveisFolgaExcessoAdicionais){

	var coluna = new Array(), colunaReal = 0, colunaBase_aux = 0, profundidadeBase = 0;

	for (var i = 0; i < tabela[0].length; i++, colunaReal++ ){
		if (typeof tabela[0][i] == "object")
			colunaReal++
	}

	if (colunaBase != tabela[0].length - 2 + variaveisAdicionais + variaveisFolgaExcessoAdicionais ){
		if (colunaBase - variaveisAdicionais >= -1 )
			colunaBase_aux = COLUNA_VARIAVEIS;
		else
			colunaBase_aux = COLUNA_FOLGAEXCESSO;
		profundidadeBase = colunaBase - colunaBase_aux;
	}else
		colunaBase_aux = 3;	
	
	for (var i = 0; i <= colunaReal; i++){
		if (i == colunaBase){
			if (typeof tabela[0][colunaBase] == "object"){
				for (var linha = 0; linha < tabela.length; linha++){
					for (var prof = 0; prof < tabela[linha][colunaBase_aux].length; prof++)
						if (prof == profundidadeBase)
							coluna.push(tabela[linha][colunaBase_aux][prof]);
				}
			}else{
				for (var linha = 0; linha < tabela.length; linha++){
					coluna.push(tabela[linha][colunaBase_aux]);
				}
			}
		}
	}
	return coluna;
}
function menorCoeficiente(linha, cabecalho, aPartirDe){
	var menor = 1000000, coeficiente = null, outrasColunas = 0;

	for (var i = aPartirDe; i <= parseInt(linha.length); i++){
		if (typeof linha[i] == "object"){
			for (var j = 0; j < linha[i].length; j++, outrasColunas++){
				var valor = parseFloat(replaceValues(String(linha[i][j]), ["{", "}", "<", ">", "[", "]", " "], ""));
				if (valor < menor){
					menor = valor;
					coeficiente = i+j;
				}
			}
		}else{
			var valor = parseFloat(replaceValues(String(linha[i]), ["{", "}", "<", ">", "[", "]", " "], ""));
			if (valor < menor){
				menor = valor;
				coeficiente = i+outrasColunas-2;
			}
		}
	}
	return coeficiente;
}
function criaCabecalho(cabecalho, variaveis, variaveisFolgaExcesso){
	cabecalho.push("Base");
	
	for(var i = 0; i < variaveis; i++){	cabecalho.push("x" + (i+1));	}
	for(var i = 0; i < variaveisFolgaExcesso; i++){	cabecalho.push("f" + (i+1));	}

	cabecalho.push("b");
}
function valorNegativo(linha, aPartirDe){
	for (var i = aPartirDe; i < linha.length; i++){
		if (typeof linha[i] == "object" ){
			for (var j = 0; j < linha[i].length; j++){
				if (linha[i][j] < 0)
					return true;
			}
		}else
			if (linha[i] < 0)
				return true;
	}
	return false;
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
		
		tabela.push([base, variavel, variavelFolgaExcesso, b]);
		//console.log("Base: " + base + "\n" + showMatriz(variavel, false) + showMatriz(variavelFolgaExcesso, false) + "B: " + b);
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