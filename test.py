import sys


def add_numbers(a, b):
    return a + b

if __name__ == '__main__':
    a = int(sys.argv[1]) 
    b = int(sys.argv[2])
    result = add_numbers(a, b)
    print(result)

