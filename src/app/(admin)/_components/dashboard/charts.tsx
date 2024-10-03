import { CategoryCharts } from "./category-charts";
import { MenuItemsChart } from "./items-statistics";

export const ShowCharts = () => {
  return ( 
    <div className="mt-6">
      <div className="xl:grid xl:grid-cols-2 grid-cols-1 gap-6 max-w-full w-full">
        <MenuItemsChart />
        <CategoryCharts />
      </div>
    </div>
  );
}