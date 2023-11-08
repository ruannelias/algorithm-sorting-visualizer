function generateRandomBars(numBars) {
    const barsContainer = document.getElementById('bars-container');
    barsContainer.innerHTML = '';
    const bars = [];
    for (let i = 0; i < numBars; i++) {
        const height = Math.floor(Math.random() * 250) + 50;
        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.height = height + 'px';
        bars.push(bar);
        barsContainer.appendChild(bar);
    }
    return bars;
}

let bars = [];

function startSorting() {
    const numBars = 50;
    bars = generateRandomBars(numBars).slice(); // Usando slice() para criar uma cópia do array
}

function swapBars(bar1, bar2) {
    const tempHeight = bar1.style.height;
    bar1.style.height = bar2.style.height;
    bar2.style.height = tempHeight;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function displayExplanation(algorithm) {
    const explanations = {
        bubbleSort: 'Bubble Sort compara pares de elementos adjacentes e os troca se estiverem na ordem errada, movendo o maior elemento gradualmente para o final da lista. Esse processo é repetido para todos os elementos, garantindo que o maior elemento esteja na posição correta ao final de cada passagem. Eficiência no pior caso: O(n^2). Eficiência no melhor caso: O(n). Estabilidade: Estável.',
        insertionSort: 'Insertion Sort constrói uma lista ordenada um elemento por vez, retirando elementos da lista e os inserindo na posição correta na nova lista. Ele compara cada elemento com os elementos na lista ordenada e insere o elemento na posição adequada, expandindo gradualmente a parte ordenada. Eficiência no pior caso: O(n^2). Eficiência no melhor caso: O(n). Stabilidade: Estável.',
        selectionSort: 'Selection Sort divide a lista em duas partes: uma parte ordenada e outra parte não ordenada. Ele encontra o menor elemento da parte não ordenada e o coloca no início da parte ordenada. Esse processo é repetido, expandindo a parte ordenada até que toda a lista esteja ordenada. Eficiência no pior caso: O(n^2). Eficiência no melhor caso: O(n^2). Stabilidade: Não estável.',
        shellSort: 'Shell Sort é uma melhoria do Insertion Sort que compara elementos distantes uns dos outros e os troca se estiverem na ordem errada, gradualmente reduzindo a distância entre os elementos a serem comparados. Isso permite que elementos menores se movam para posições corretas mais rapidamente, otimizando o processo de ordenação. Eficiência no pior caso: O(n log^2 n). Eficiência no melhor caso: O(n log n). Stabilidade: Não estável.',
        quickSort: 'Quick Sort escolhe um elemento como pivô e divide a lista em duas sub-listas: elementos menores que o pivô e elementos maiores que o pivô. Em seguida, ele ordena recursivamente as sub-listas. O processo de divisão e ordenação recursiva é repetido até que toda a lista esteja ordenada. O Quick Sort é eficiente para grandes conjuntos de dados devido à sua abordagem recursiva e à rápida reorganização dos elementos. Eficiência no pior caso: O(n^2) (ocorre quando o pivô é sempre o menor ou o maior elemento da lista, levando a partições desequilibradas). Eficiência no melhor caso: O(n log n). Stabilidade: Não estável.',
        start: 'Clique em um algoritmo de ordenação para ver a explicação correspondente.',
        default: 'Selecione um algoritmo de ordenação para ver a explicação.'
    };

    const explanationContainer = document.querySelector('.explanation-content');
    const explanation = document.querySelector('.explanation');

    const explanationText = explanations[algorithm] || explanations.default;
    explanationContainer.textContent = explanationText;
    explanation.classList.add('active');
}

async function bubbleSort() {
    const n = bars.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            bars[j].style.backgroundColor = '#ff0000';
            bars[j + 1].style.backgroundColor = '#ff0000';
            await sleep(100);
            const height1 = parseInt(bars[j].style.height);
            const height2 = parseInt(bars[j + 1].style.height);
            if (height1 > height2) {
                swapBars(bars[j], bars[j + 1]);
            }
            bars[j].style.backgroundColor = '#3498db';
            bars[j + 1].style.backgroundColor = '#3498db';
        }
        bars[n - i - 1].style.backgroundColor = '#27ae60';
    }
}

async function selectionSort() {
    const n = bars.length;
    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;
        bars[i].style.backgroundColor = '#ff0000';
        for (let j = i + 1; j < n; j++) {
            bars[j].style.backgroundColor = '#ff0000';
            await sleep(100);
            const height1 = parseInt(bars[minIndex].style.height);
            const height2 = parseInt(bars[j].style.height);
            if (height2 < height1) {
                bars[minIndex].style.backgroundColor = '#3498db';
                minIndex = j;
            } else {
                bars[j].style.backgroundColor = '#3498db';
            }
        }
        swapBars(bars[minIndex], bars[i]);
        bars[minIndex].style.backgroundColor = '#27ae60';
    }
}

async function insertionSort() {
    const n = bars.length;
    for (let i = 1; i < n; i++) {
        const key = parseInt(bars[i].style.height);
        let j = i - 1;
        bars[i].style.backgroundColor = '#ff0000';
        await new Promise(resolve => setTimeout(resolve, 100));
        while (j >= 0 && parseInt(bars[j].style.height) > key) {
            bars[j + 1].style.height = bars[j].style.height;
            j = j - 1;
            for (let k = 0; k < n; k++) {
                bars[k].style.backgroundColor = '#3498db';
            }
            bars[i].style.backgroundColor = '#ff0000';
            bars[j + 1].style.backgroundColor = '#ff0000';
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        bars[j + 1].style.height = key + 'px';
        bars[i].style.backgroundColor = '#27ae60';
        for (let k = 0; k < n; k++) {
            bars[k].style.backgroundColor = '#27ae60';
        }
    }
}

async function shellSort(bars) {
    const n = bars.length;
    let gap = Math.floor(n / 2);
    while (gap > 0) {
        for (let i = gap; i < n; i++) {
            const tempHeight = parseInt(bars[i].style.height);
            let j = i;
            while (j >= gap && parseInt(bars[j - gap].style.height) > tempHeight) {
                bars[j].style.backgroundColor = '#ff0000';
                bars[j].style.height = bars[j - gap].style.height;
                await new Promise(resolve => setTimeout(resolve, 100));
                bars[j].style.backgroundColor = '#3498db';
                j -= gap;
            }
            bars[j].style.height = tempHeight + 'px';
        }
        gap = Math.floor(gap / 2);
    }
    for (let i = 0; i < n; i++) {
        bars[i].style.backgroundColor = '#27ae60';
        await new Promise(resolve => setTimeout(resolve, 100));
    }
}

async function shellSortVisual() {
    const n = bars.length;
    await shellSort(bars);
}

async function partition(low, high) {
    const pivot = parseInt(bars[high].style.height);
    let i = low - 1;
    bars[high].style.backgroundColor = '#ff0000';
    for (let j = low; j < high; j++) {
        bars[j].style.backgroundColor = '#ff0000';
        await new Promise(resolve => setTimeout(resolve, 100));
        if (parseInt(bars[j].style.height) < pivot) {
            i++;
            swapBars(bars[i], bars[j]);
        }
        bars[j].style.backgroundColor = '#3498db';
    }
    swapBars(bars[i + 1], bars[high]);
    bars[high].style.backgroundColor = '#3498db';
    bars[i + 1].style.backgroundColor = '#27ae60';
    return i + 1;
}

async function quickSort(low, high) {
    if (low < high) {
        const pi = await partition(low, high);
        await quickSort(low, pi - 1);
        await quickSort(pi + 1, high);
    }
}

async function quickSortVisual() {
    const n = bars.length;
    await quickSort(0, n - 1);
    for (let i = 0; i < n; i++) {
        bars[i].style.backgroundColor = '#27ae60';
        await new Promise(resolve => setTimeout(resolve, 100));
    }
}
