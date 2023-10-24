#!/usr/bin/env python3
"""Defines a class MRUCache"""


from base_caching import BaseCaching
from collections import OrderedDict


class MRUCache(BaseCaching):
    """Inherits from BaseCaching and is a caching system"""

    def __init__(self):
        """Initializes the MRUCache class"""
        super().__init__()
        self.cache_data = OrderedDict()

    def put(self, key, item):
        """Method that assigns to the dictionary self.cache_data
        the item value for the key"""
        if key is None or item is None:
            return

        if len(self.cache_data) >= BaseCaching.MAX_ITEMS:
            mru_item = next(reversed(self.cache_data))
            print(f"DISCARD: {mru_item}")
            del self.cache_data[mru_item]

        self.cache_data[key] = item

    def get(self, key):
        """Returns  the value in self.cache_data linked to key"""
        if key is None or key not in self.cache_data:
            return None

        return self.cache_data[key]
