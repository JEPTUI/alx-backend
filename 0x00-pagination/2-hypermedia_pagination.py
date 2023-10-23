#!/usr/bin/env python3
"""Defines a module that takes two integer arguments page
with default value 1"""


import csv
import math
from typing import List

def index_range(page, page_size):
    if page <= 0 or page_size <= 0:
        return None

    start_index = (page - 1) * page_size
    end_index = start_index + page_size

    return start_index, end_index


class Server:
    """Server class to paginate a database of popular baby names.
    """
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__dataset = None

    def dataset(self) -> List[List]:
        """Cached dataset
        """
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
	    self.__dataset = dataset[1:]

        return self.__dataset

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List]:
            """Takes two integer arguments page with default
            value 1 and page_size with default value 10"""
            if not (isinstance(page, int) and isinstance(
                page_size, int) and  page > 0 and page_size > 0):
                return []
            start, end = index_range(page, page_size)
            dataset = self.dataset()

            if start >= len(dataset):
                return []

            return dataset[start:end]

    def get_hyper(self, page: int = 1, page_size: int = 10) -> dict:
        """Takes the same arguments (and defaults) as
        get_page and returns a dictionary"""
        page_data = self.get_page(page, page_size)
        total_pages = math.ceil(len(self.dataset()) / page_size)

        next_page = page + 1 if page < total_pages else None
        prev_page = page - 1 if page > 1 else None

        return {
            "page_size": len(page_data),
            "page": page,
            "data": page_data,
            "next_page": next_page,
            "prev_page": prev_page,
            "total_pages": total_pages
        }
