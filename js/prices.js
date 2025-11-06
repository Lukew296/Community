class PriceList {
    constructor() {
        this.priceList = document.getElementById('priceList');
        this.loadPrices();
    }

    async loadPrices() {
        try {
            const { data, error } = await supabase
                .from('prices')
                .select('*');

            if (error) throw error;

            this.displayPrices(data);
        } catch (error) {
            console.error('Error loading prices:', error);
            alert('Error loading prices');
        }
    }

    displayPrices(prices) {
        this.priceList.innerHTML = prices.map(price => `
            <div class="price-item">
                <img src="${price.image}" alt="${price.name}">
                <div class="price-info">
                    <h3>${price.name}</h3>
                    <p>$${price.price.toFixed(2)}</p>
                </div>
            </div>
        `).join('');
    }
}

const priceList = new PriceList();
