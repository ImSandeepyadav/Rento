'use client';
import React from 'react';
import qs from 'query-string';
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { IconType } from "react-icons";

interface CategoryBoxProps {
  icon: IconType,
  label: string;
  selected?: boolean;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
  icon: Icon,
  label,
  selected,
}) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    let currentQuery = {};
    
    if (params) {
      currentQuery = qs.parse(params.toString())
    }

    const updatedQuery: { [key: string]: string | string[] } = {
      ...currentQuery,
      category: label
    };

    if (params?.get('category') === label) {
      delete updatedQuery.category;
    }

    const url = qs.stringifyUrl({
      url: '/',
      query: updatedQuery
    }, { skipNull: true });

    router.push(url);
  }, [label, router, params]);

  return ( 
    <div
      onClick={handleClick}
      className={`
        flex 
        flex-row 
        items-center 
        w-full
        gap-3
        p-4
        hover:bg-[#8d5959]
        rounded-lg
        transition
        cursor-pointer
        ${selected ? 'bg-[#8d5959]' : 'transparent'}
        ${selected ? 'text-white' : 'text-neutral-200'}
      `}
    >
      <Icon size={26} />
      <div className="font-medium text-sm whitespace-nowrap">
        {label}
      </div>
    </div>
   );
}
 
export default CategoryBox;