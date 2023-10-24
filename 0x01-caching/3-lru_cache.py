#!/usr/bin/env python3
"""Defines a class caching system LRUCache"""


from base_caching import BaseCaching
from collections import OrderedDict


class LRUCache(BaseCaching):
    """Inherits from base class BaseCaching"""

    def __init__(self):
        """Initializes the LRUCache class"""
        super().__init__()
        self.cache_data = OrderedDict()

    def put(self, key, item):
        """Method that assigns to the dictionary self.cache_data
        the item value for the key"""
        if key is None or item is None:
            return
        if len(self.cache_data) >= BaseCaching.MAX_ITEMS:
            lru_item, _ = self.cache_data.popitem(last=False)
            print(f"DISCARD: {lru_item}")

        self.cache_data[key] = item

    def get(self, key):
        """Returns the value in self.cache_data linked to key"""
        if key is None or key not in self.cache_data:
            return None

        self.cache_data.move_to_end(key)
        return self.cache_data[key]
