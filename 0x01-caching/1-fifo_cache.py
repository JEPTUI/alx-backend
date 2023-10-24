#!/usr/bin/env python3
"""Defines a class FIFOCache"""


from base_caching import BaseCaching


class FIFOCache(BaseCaching):
    """Inherits from BaseCaching"""

    def __init__(self):
        """Initializes class FIFOCache"""
        super().__init__()

    def put(self, key, item):
        """Method that assigns to the dictionary self.cache_data
        the item value for the key"""
        if key is None or item is None:
            return
        if len(self.cache_data) >= BaseCaching.MAX_ITEMS:
            # find first item in FIFO
            first_key = next(iter(self.cache_data))
            # discard the first item
            del self.cache_data[first_key]

            print(f"DISCARD: {first_key}")

        self.cache_data[key] = item

    def get(self, key):
        """Returns  the value in self.cache_data linked to key."""
        if key is None or key not in self.cache_data:
            return None

        return self.cache_data[key]
