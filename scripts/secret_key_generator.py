#!/usr/bin/python3
import sys
import random
import string

KEY_LENGTH = 50
# get length rfom command line if provided
if len(sys.argv) == 2:
    try:
        KEY_LENGTH = int(sys.argv[1])
    except ValueError:
        pass

# generate the key
events = string.digits + string.ascii_letters + string.punctuation
characters = [random.SystemRandom().choice(events) for i in range(KEY_LENGTH)]
secret_key = "".join(characters)
# print the key on stdout
print(secret_key)
