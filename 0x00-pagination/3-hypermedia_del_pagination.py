#!/usr/bin/env python3
"""
Deletion-resilient hypermedia pagination
"""

import csv
import math
from typing import List


class Server:
    """Server class to paginate a database of popular baby names.
    """
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__dataset = None
        self.__indexed_dataset = None

    def dataset(self) -> List[List]:
        """Cached dataset
        """
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset

    def indexed_dataset(self) -> Dict[int, List]:
        """Dataset indexed by sorting position, starting at 0
        """
        if self.__indexed_dataset is None:
            dataset = self.dataset()
            truncated_dataset = dataset[:1000]
            self.__indexed_dataset = {
                i: dataset[i] for i in range(len(dataset))
            }
        return self.__indexed_dataset

    def get_hyper_index(self, index: int = None, page_size: int = 10) -> Dict:
            """Implement a get_hyper_index method with two integer argument"""
            if index is None:
                index = 0  # Set default index to 0 if not provided
            if not (isinstance(index, int) and index >= 0):
                return {}

            indexed_dataset = self.indexed_dataset()
            total_rows = len(indexed_dataset)

            if index >= total_rows:
                return {}  # Invalid index
            
            next_index = min(index + page_size, total_rows)
            data = [indexed_dataset[i] for i in range(index, next_index)]
            
            return {
                    "index": index,
                    "next_index": next_index,
                    "page_size": page_size,
                    "data": data
                    }
