const logger = (req, res, next) => {
    const start = Date.now(); // Tubaze igihe bitangiriye
    const time = new Date().toLocaleTimeString();

    // Iyi mivurungano ikora iyo porogaramu irangije gusubiza (Finish)
    res.on('finish', () => {
        const duration = Date.now() - start; // Igihe byatwaye (milliseconds)
        const status = res.statusCode; // Code nka 200 (OK) cyangwa 404 (Not Found)

        // Gukoresha amabara mu terminal (Urugero: Green kuri OK, Red kuri Error)
        let statusColor = status >= 400 ? '❌' : '✅';

        console.log(
            `${statusColor} [${time}] ${req.method} ${req.url} - Status: ${status} (${duration}ms)`
        );
    });

    next(); // Jya ku gikorwa gikurikira (Controller)
};

module.exports = logger;