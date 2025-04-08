import {calculateCoffeeStats, calculateCurrentCaffeineLevel, coffeeConsumptionHistory, getTopThreeCoffees, statusLevels} from "../utils/index.js"
function StatCard(props) {
    const {lg, title, children} = props
    return (
        <div className={'card stat-card  ' + (lg ? ' col-span-2' : '')}>
            <h4>{title}</h4>
            {children}
        </div>
    )
}
export default function Stats() {
    const stats = calculateCoffeeStats(coffeeConsumptionHistory)

    const caffieneLevel = calculateCurrentCaffeineLevel(coffeeConsumptionHistory)
    const warningLevel = caffieneLevel < statusLevels['low'].maxLevel ? 'low' : caffieneLevel < statusLevels['moderate'].maxLevel ? 'moderate' : 'high' 

    return (
        <>
           <div className="section-header">
                <i className="fa-solid fa-chart-simple"></i>
                <h2>Stats</h2>
            </div>
            <div className="stats-grid">
                <StatCard lg title="Active Caffeine level">
                    <div className="status">
                        <p><span className="stat-text">{caffieneLevel}</span>mg</p>
                        <h5 style={{color: statusLevels[warningLevel].color, background: statusLevels[warningLevel].background}}>Low</h5>
                    </div>
                    <p>{statusLevels[warningLevel].description}</p>
                </StatCard>
                <StatCard title="Daily Caffeine">
                    <p><span className="stat-text">{stats.daily_caffeine}</span>mg</p>
                </StatCard>
                <StatCard title="Avg # of Coffees">
                    <p><span className="stat-text">{stats.average_coffees}</span></p>
                </StatCard>
                <StatCard title="Daily Cost ($)">
                    <p>$ <span className="stat-text">{stats.daily_cost}</span></p>
                </StatCard>
                <StatCard title="Total Cost ($)">
                    <p>$ <span className="stat-text">{stats.total_cost}</span></p>
                </StatCard>
                <table className="stat-table">
                    <thead>
                        <tr>
                            <th>Coffee Name</th>
                            <th>Number of Purchases</th>
                            <th>Percentage</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            getTopThreeCoffees(coffeeConsumptionHistory).map((coffee, coffeeIndex) => {
                                return (
                                    <tr key={coffeeIndex}>
                                        <td>{coffee.coffeeName}</td>
                                        <td>{coffee.count}</td>
                                        <td>{coffee.percentage}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </>
    )}
