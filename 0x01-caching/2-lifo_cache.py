#!/usr/bin/env python3
"""Defines a class LIFOCache"""


from base_caching import BaseCaching


class LIFOCache(BaseCaching):
    """Inherits from class BaseCaching"""

    def __init__(self):
        """Defines the class LIFOCache"""
        super().__init__()

    def put(self, key, item):
        """MEthod that assigns dictionary self.cache_data
        the item value for the key"""

        if key is None or item is None:
            return

        if len(self.cache_data) >= BaseCaching.MAX_ITEMS:
            last_item = list(self.cache_data.keys())[-1]
            del self.cache_data[last_item]
            print(f"DISCARD: {last_item}")

        self.cache_data[key] = item

    def get(self, key):
        """Returns the value in self.cache_data linked to key"""
        if key is None or key not in self.cache_data:
            return None

        return self.cache_data[key]
