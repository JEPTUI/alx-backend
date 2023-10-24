#!/usr/bin/env python3
"""Defines a class BasicCache that inherits from BaseCaching
and is a caching system"""


from base_caching import BaseCaching


class BasicCache(BaseCaching):
    """Inherits from BaseCaching"""

    def put(self, key, item):
        """method that assigns to the dictionary"""
        if key is None or item is None:
            return
        self.cache_data[key] = item

    def get(self, key):
        """returns  the value in self.cache_data linked to key"""
        if key is None or key not in self.cache_data:
            return None

        return self.cache_data[key]
