const pool = require('../../config/database');

const routeCall = async (callParams) => {
    let novoDestino = '';
    const connection = await pool.getConnection();

    try {
        let findRoute = `SELECT id, trunk_name, regex, prepend, tn_tratado, status FROM routes 
            WHERE '${callParams.dstNumber}' REGEXP regex and status = '1' 
                and trunk_name = '${callParams.trunkName}' or trunk_name_b = '${callParams.trunkName}' 
            ORDER BY id LIMIT 1`;

        console.log(findRoute);
        const resultado = await connection.query(findRoute);

        if (resultado[0][0]) {
            novoDestino = `${resultado[0][0].prepend}${callParams.dstNumber.slice(resultado[0][0].tn_tratado)}`;
            console.log(`Route ID: ${resultado[0][0].id}, Novo destino: ${novoDestino}`);
        } else {
            console.log(`Sem rota para TN destino - TN Destino: ${callParams.dstNumber}`);
            novoDestino = /.*9[1-9][0-9]{7}$/.test(callParams.dstNumber) 
                          ? callParams.dstNumber.slice(-9)
                          : callParams.dstNumber.slice(-8);
        }

    } catch (error) {
        console.error("Erro na etapa de roteamento", error);
    } finally {
        connection.release();
    }

    return novoDestino;
};

module.exports = { routeCall };
