package main

import (
	"fmt"
	"math/rand"
)

func main() {
	var plot [10][10]int
	for i := 0; i < len(plot); i++ {
		for j := 0; j < len(plot[i]); j++ {
			plot[i][j] = rand.Intn(2)
		}
		fmt.Println(plot[i])
	}
	fmt.Println("-------------------------")

	for i := 0; i < 20; i++ {
		generateNewEpoch(&plot)
	}
}

func generateNewEpoch(plot *[10][10]int) {
	for i := 0; i < len(plot); i++ {
		for j := 0; j < len(plot[i]); j++ {
			neighborsCount := getNeighborsCount(plot, i, j)
			if plot[i][j] == 0 {
				if neighborsCount == 3 {
					plot[i][j] = 1
				}
			} else {
				if neighborsCount < 2 || neighborsCount > 3 {
					plot[i][j] = 0
				}
			}
		}
		fmt.Println(plot[i])
	}
	fmt.Println("-------------------------")
}

func getNeighborsCount(plot *[10][10]int, i int, j int) int {
	leftI := i - 1
	rightI := i + 1
	leftJ := j - 1
	rightJ := j + 1

	if leftI < 0 {
		leftI = 0
	} else if rightI > 9 {
		rightI = 9
	}

	if leftJ < 0 {
		leftJ = 0
	} else if rightJ > 9 {
		rightJ = 9
	}

	var count int
	for k := leftI; k <= rightI ; k++ {
		for m := leftJ; m <= rightJ; m++ {
			if k != i && m != j {
				count += plot[k][m]
			}
		}
	}
	return count
}
