import { EmployeeCard } from "@/components/employee-card";
import Loader from "@/components/loader";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { DataListItem, DataListRoot } from "@/components/ui/data-list";
import { useEmployees } from "@/utils/hooks/useEmployees";
import { Card, Separator } from "@chakra-ui/react";
import { Label, Pie, PieChart } from "recharts";

const chartConfig = {
  IT: {
    label: "IT",
    color: "hsl(12, 76%, 61%)",
  },
  Operations: {
    label: "Operations",
    color: "hsl(173, 58%, 39%)",
  },
  Design: {
    label: "Design",
    color: "hsl(197, 37%, 24%)",
  },
  Analytics: {
    label: "Analytics",
    color: "hsl(43, 74%, 66%)",
  },
};

export default function HomePage() {
  const { data: employeesData, loading } = useEmployees();

  if (loading) {
    return <Loader />;
  }

  const departmentCounts = employeesData.reduce<Record<string, number>>(
    (acc, employee) => {
      const department = employee.department;
      acc[department] = (acc[department] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const departmentCountArray = Object.entries(departmentCounts).map(
    ([departmentName, count]) => ({
      departmentName,
      count,
      fill: `var(--color-${departmentName})`,
    })
  );

  const sortedEmployees = [...employeesData]?.sort((a, b) => {
    const dateA = new Date(a.hireDate).getTime();
    const dateB = new Date(b.hireDate).getTime();
    return dateB - dateA;
  });
  return (
    <div className="max-w-[1080px] w-11/12 mx-auto my-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Card.Root variant={"elevated"}>
          <Card.Body>
            <DataListRoot
              className="flex h-full items-center justify-center"
              orientation="horizontal"
            >
              {departmentCountArray.map((item) => (
                <DataListItem
                  key={item.departmentName}
                  label={item.departmentName}
                  value={item.count}
                />
              ))}
            </DataListRoot>
          </Card.Body>
        </Card.Root>
        <Card.Root variant={"elevated"}>
          <Card.Body>
            <div>
              <ChartContainer
                config={chartConfig}
                className="mx-auto aspect-square max-h-[250px] [&_.recharts-text]:fill-background"
              >
                <PieChart>
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Pie
                    data={departmentCountArray}
                    dataKey="count"
                    nameKey="departmentName"
                    innerRadius={60}
                    strokeWidth={5}
                  >
                    <Label
                      content={({ viewBox }) => {
                        if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                          return (
                            <text
                              x={viewBox.cx}
                              y={viewBox.cy}
                              textAnchor="middle"
                              dominantBaseline="middle"
                            >
                              <tspan
                                x={viewBox.cx}
                                y={viewBox.cy}
                                className="text-purple-500 text-3xl font-bold"
                              >
                                {employeesData.length.toLocaleString()}
                              </tspan>
                              <tspan
                                x={viewBox.cx}
                                y={(viewBox.cy || 0) + 24}
                                className="text-purple-500"
                              >
                                Total Employees
                              </tspan>
                            </text>
                          );
                        }
                      }}
                    />
                  </Pie>
                </PieChart>
              </ChartContainer>
            </div>
          </Card.Body>
        </Card.Root>
      </div>

      <div className="my-8">
        <h5 className="text-lg font-semibold">Recently Joined Employee</h5>
        <Separator className="mt-1 mb-5" />

        <div className="space-y-4">
          {sortedEmployees.slice(0, 5).map((employee) => (
            <EmployeeCard employee={employee} key={employee.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
