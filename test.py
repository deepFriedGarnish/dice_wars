import matplotlib.pyplot as plt
import numpy as np

# Define the right triangle vertices
A = (0, 0)
B = (4, 0)  # x-axis point (a, 0)
C = (0, 3)  # y-axis point (0, b)

# Choose a point (x, y) on the hypotenuse
# We'll pick x = 2 (halfway along x), calculate y using the hypotenuse equation
a, b = B[0], C[1]
x = 2
y = -b/a * x + b  # y = -3/4 * x + 3

# Points for horizontal and vertical lines
horizontal_line = [(0, y), (x, y)]
vertical_line = [(x, 0), (x, y)]

# Plotting
plt.figure(figsize=(6, 6))
# Triangle
plt.plot([A[0], B[0]], [A[1], B[1]], 'k')  # AB
plt.plot([B[0], C[0]], [B[1], C[1]], 'k')  # BC
plt.plot([C[0], A[0]], [C[1], A[1]], 'k')  # CA

# Horizontal and vertical lines
plt.plot([p[0] for p in horizontal_line], [p[1] for p in horizontal_line], 'r--', label='Horizontal line')
plt.plot([p[0] for p in vertical_line], [p[1] for p in vertical_line], 'b--', label='Vertical line')

# Hypotenuse point
plt.plot(x, y, 'go', label='Intersection on hypotenuse')

# Axes and labels
plt.axhline(0, color='gray', linewidth=0.5)
plt.axvline(0, color='gray', linewidth=0.5)
plt.xlim(-1, 5)
plt.ylim(-1, 4)
plt.gca().set_aspect('equal', adjustable='box')
plt.title("Right Triangle with Horizontal and Vertical Lines to Hypotenuse")
plt.legend()
plt.grid(True)
plt.show()