import Company from '../company/company.model.js'
import ExcelJS from 'exceljs'


export const generateReport = async (req, res) => {
    try {
        console.log("Generando reporte...")
        const companies = await Company.find();
        console.log("Empresas encontradas:", companies.length)
        const workbook = new ExcelJS.Workbook()
        const worksheet = workbook.addWorksheet('Empresas')

        worksheet.columns = [
            { header: 'Nombre', key: 'name', width: 30 },
            { header: 'Email', key: 'email', width: 25 },
            { header: 'Teléfono', key: 'phone', width: 15 },
            { header: 'Dirección', key: 'address', width: 40 },
            { header: 'Años de Trayectoria', key: 'yoTrayectory', width: 20 },
            { header: 'Nivel de Impacto', key: 'impactLvl', width: 20 },
            { header: 'Categoría', key: 'cCategorie', width: 20 }
        ];

        companies.forEach((company) => {
            worksheet.addRow({
                name: company.name,
                email: company.email,
                phone: company.phone,
                address: company.address,
                yoTrayectory: company.yoTrayectory,
                impactLvl: company.impactLvl,
                cCategorie: company.cCategorie
            });
        });

        console.log("Archivo Excel generado correctamente");

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=reporte_empresas.xlsx');

        await workbook.xlsx.write(res);
        res.end();
    } catch (e) {
        console.error("Error en generateReport:", e); 
        res.status(500).json({ message: "Error al generar el reporte", error: e });
    }
};