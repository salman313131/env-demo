const DailyData = require('../model/daily')
const MonthlyData = require('../model/monthly')
const YearlyData = require('../model/yearly')
exports.addContent = async (req, res, next) => {
  try {
    const jsonData = req.body;

    await DailyData.create({
      day: jsonData.day,date: jsonData.date,month: jsonData.month,year: jsonData.year,salary: jsonData.salary,spending: jsonData.spending,category: jsonData.category,
    });

    const month = await MonthlyData.findOne({
      where: { month: jsonData.month, year: jsonData.year },
    });

    if (month) {
        const salaryMonthData=Number(month.salary) + Number(jsonData.salary)
        const spendingMonthData=Number(month.spending) + Number(jsonData.spending)
      await MonthlyData.update(
        {
          salary: salaryMonthData,
          spending: spendingMonthData,
        },
        { where: { month: jsonData.month, year: jsonData.year } }
      );
    } else {
      await MonthlyData.create({
        month: jsonData.month,
        year: jsonData.year,
        salary: jsonData.salary,
        spending: jsonData.spending,
      });
    }

    const year = await YearlyData.findOne({where:{year:jsonData.year}})
      if(year){
        const salaryYearData = Number(year.salary)+Number(jsonData.salary)
        const spendingYearData = Number(year.spending)+Number(jsonData.spending)
      await YearlyData.update({
        salary:salaryYearData,
        spending:spendingYearData
      },
      {
        where:{year: jsonData.year}
      })
    }
    else{
        await YearlyData.create({
        year: jsonData.year,
        salary: jsonData.salary,
        spending: jsonData.spending,
      });
    }
    res.status(201).json({ message: 'Content added successfully.' });
  } catch (error) {
    console.error('Error adding content:', error);
    res.status(500).json({ error: 'An error occurred while adding content.' });
  }
};

exports.getContent = async (req, res, next) => {
  try {
    const { date, month, year } = req.query;

    const response = await DailyData.findAll({
      where: { date:date, month:month, year:year }, attributes :['salary','spending','category']
    });
    res.json(response);
  } catch (error) {
    console.error('Error fetching content:', error);
    res.status(500).json({ error: 'An error occurred while fetching content.' });
  }
};