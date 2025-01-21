import { useCallback } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

interface CounterProps {
  title: string;
  subtitle: string;
  value: number;
  onChange: (value: number) => void;
}

const Counter: React.FC<CounterProps> = ({
  title,
  subtitle,
  value,
  onChange,
}) => {
  const onAdd = useCallback(() => {
    onChange(value + 1);
  }, [onChange, value]);

  const onReduce = useCallback(() => {
    if (value === 1) {
      return;
    }
    onChange(value - 1);
  }, [onChange, value]);

  return ( 
    <div className="flex flex-row items-center justify-between p-4 bg-white rounded-lg shadow-md">
      <div className="flex flex-col space-y-1">
        <div className="text-lg font-semibold text-gray-900">{title}</div>
        <div className="text-sm text-gray-600">
          {subtitle}
        </div>
      </div>
      <div className="flex flex-row items-center gap-4">
        <button
          onClick={onReduce}
          className="
            w-8
            h-8
            rounded-full
            border
            border-gray-300
            flex
            items-center
            justify-center
            text-gray-700
            cursor-pointer
            hover:bg-gray-100
            transition-colors
            duration-200
            ease-in-out
            disabled:opacity-50
            disabled:cursor-not-allowed
          "
          disabled={value <= 1}
        >
          <AiOutlineMinus className="w-3 h-3" />
        </button>
        <div 
          className="
            text-lg
            font-medium 
            text-gray-900
            min-w-[1.5rem]
            text-center
          "
        >
          {value}
        </div>
        <button
          onClick={onAdd}
          className="
            w-8
            h-8
            rounded-full
            border
            border-gray-300
            flex
            items-center
            justify-center
            text-gray-700
            cursor-pointer
            hover:bg-gray-100
            transition-colors
            duration-200
            ease-in-out
          "
        >
          <AiOutlinePlus className="w-3 h-3" />
        </button>
      </div>
    </div>
   );
}
 
export default Counter;