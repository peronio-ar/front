import { Dispatch, SetStateAction } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  ResponsiveContainer,
  YAxis,
  Tooltip
} from "recharts";
import { PairDataTimeWindowEnum } from "../../../../types/utils";
import HoverUpdater from "../HoverUpdater";
import LoadingChart from "./LoadingChart";

interface ILineChart {
  setHoverDate: Dispatch<SetStateAction<string | undefined>>;
  setHoverValue: Dispatch<SetStateAction<number | undefined>>;
  data: any[];
  colors: {
    gradient1: string;
    gradient2: string;
    stroke: string;
  };
  gradientId: string;
  timeWindow: PairDataTimeWindowEnum;
  isLoading: boolean;
}

const dateFormattingByTimewindow: Record<
  PairDataTimeWindowEnum,
  Intl.DateTimeFormatOptions
> = {
  [PairDataTimeWindowEnum.DAY]: {
    hour: "2-digit",
    minute: "2-digit"
  },
  [PairDataTimeWindowEnum.WEEK]: {
    month: "short",
    day: "2-digit"
  },
  [PairDataTimeWindowEnum.MONTH]: {
    month: "short",
    day: "2-digit"
  },
  [PairDataTimeWindowEnum.YEAR]: {
    month: "short",
    day: "2-digit"
  }
};

const BasicDataChart = ({
  setHoverDate,
  setHoverValue,
  data,
  colors,
  gradientId,
  timeWindow,
  isLoading
}: ILineChart) => {
  const dateFormatting = dateFormattingByTimewindow[timeWindow];

  if (isLoading) {
    return <LoadingChart />;
  }

  return (
    <ResponsiveContainer className="xl:h-[15rem] 2xl:h-[20rem] w-fit">
      <AreaChart
        width={300}
        height={200}
        data={data}
        margin={{
          top: 0,
          right: 5,
          left: 0,
          bottom: 5
        }}
        onMouseLeave={() => {
          if (setHoverDate) setHoverDate(undefined);
          if (setHoverValue) setHoverValue(undefined);
        }}
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={colors.gradient1} stopOpacity={0.3} />
            <stop offset="80%" stopColor={colors.gradient2} stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="date"
          tickFormatter={(time) => time.toLocaleString("es-es", dateFormatting)}
          minTickGap={8}
        />
        <YAxis
          dataKey="price"
          axisLine={false}
          tickLine={false}
          domain={["auto", "auto"]}
          hide
        />
        <Tooltip
          contentStyle={{ display: "none" }}
          formatter={(tooltipValue, name, props) => (
            <HoverUpdater
              locale={"es-es"}
              payload={props.payload}
              setHoverValue={setHoverValue}
              setHoverDate={setHoverDate}
            />
          )}
        />
        <Area
          type="linear"
          dataKey="price"
          fillOpacity={1}
          stroke={colors.stroke}
          fill={`url(#${gradientId})`}
          strokeWidth={2}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default BasicDataChart;
