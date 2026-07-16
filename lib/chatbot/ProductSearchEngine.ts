import { products } from "@/data/site";

export class ProductSearchEngine {

    search(message: string) {

        const text = message.toLowerCase();

        //---------------------------------
        // Marka
        //---------------------------------

        if (text.includes("royal")) {

            return products.filter(p =>
                p.brand.toLowerCase().includes("royal")
            );

        }

        if (text.includes("pro plan")) {

            return products.filter(p =>
                p.brand.toLowerCase().includes("pro plan")
            );

        }

        if (text.includes("nd") || text.includes("n&d")) {

            return products.filter(p =>
                p.brand.toLowerCase().includes("n&d")
            );

        }

        if (text.includes("felicia")) {

            return products.filter(p =>
                p.brand.toLowerCase().includes("felicia")
            );

        }

        //---------------------------------
        // Protein
        //---------------------------------

        if (text.includes("somon")) {

            return products.filter(product => {

                const value = (
                    product.name +
                    product.description
                ).toLowerCase();

                return value.includes("somon");

            });

        }

        if (text.includes("kuzu")) {

            return products.filter(product => {

                const value = (
                    product.name +
                    product.description
                ).toLowerCase();

                return value.includes("kuzu");

            });

        }

        if (text.includes("tavuk")) {

            return products.filter(product => {

                const value = (
                    product.name +
                    product.description
                ).toLowerCase();

                return value.includes("tavuk");

            });

        }

        //---------------------------------
        // Tahılsız
        //---------------------------------

        if (
            text.includes("tahılsız") ||
            text.includes("tahilsiz")
        ) {

            return products.filter(product => {

                const value = (
                    product.name +
                    product.description
                ).toLowerCase();

                return (
                    value.includes("tahılsız") ||
                    value.includes("tahilsiz")
                );

            });

        }

        //---------------------------------
        // En ucuz
        //---------------------------------

        if (
            text.includes("en ucuz") ||
            text.includes("ucuz")
        ) {

            return [...products].sort(
                (a, b) => a.price - b.price
            );

        }

        //---------------------------------
        // En pahalı
        //---------------------------------

        if (
            text.includes("premium") ||
            text.includes("en pahalı")
        ) {

            return [...products].sort(
                (a, b) => b.price - a.price
            );

        }

        return [];

    }

}