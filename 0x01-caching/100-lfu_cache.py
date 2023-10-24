#!/usr/bin/env python3
"""Defines a class LFUCache"""


from base_caching import BaseCaching
from collections import OrderedDict


class LFUCache(BaseCaching):
    """Inherits from BaseCaching and is a caching system"""

    def __init__(self):
        """Initializes class LFUCache"""
        super().__init__()
        self.frequency = {}

    def put(self, key, item):
        """Method that assigns to the dictionary self.cache_data
        the item value for the key"""
        if key is None or item is None:
            return
        if len(self.cache_data) >= BaseCaching.MAX_ITEMS:
            min_freq = min(self.frequency.values())
            lfu_items = [k for k, v in self.frequency.items() if v == min_freq]
            
            if len(lfu_items) > 1:
                lru_item = min(self.cache_data, key=lambda k: self.cache_data[k][1])
                lfu_items.remove(lru_item)
                
                print(f"DISCARD: {lru_item}")
                del self.cache_data[lru_item]
                del self.frequency[lru_item]
            
            for lfu_item in lfu_items:
                print(f"DISCARD: {lfu_item}")
                del self.cache_data[lfu_item]
                del self.frequency[lfu_item]

        self.cache_data[key] = (item, 0)
        self.frequency[key] = 0

    def get(self, key):
        """Returns the value in self.cache_data linked to key"""
        if key is None or key not in self.cache_data:
            return None

        item, freq = self.cache_data[key]
        self.cache_data[key] = (item, freq + 1)
        self.frequency[key] = freq + 1

        return item
