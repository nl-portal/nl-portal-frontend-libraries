export default {
  zaak: 'https://zaken.nl/api/v1/zaken/1',
  data: [
    {
      heading: 'Algemeen',
      value: [
        {
          key: 'Dit is een test',
          description: 'Locatie waar...',
          value: 'Mooi',
        },
        {
          key: 'Waarom?',
          value: 'Daarom',
        },
      ],
    },
    {
      heading: 'Kosten',
      value: [
        {
          key: 'Locatie',
          description: 'Locatie waar...',
          value: 'Spui 70',
        },
        {
          key: 'Bedrag',
          value: '€250',
        },
      ],
    },
    {
      heading: 'Betaalgeschiedenis',
      type: 'table',
      value: {
        headers: [
          {
            key: 'periode',
            description: 'Periode waarover betaald is',
            value: 'Periode',
          },
          {
            key: 'bedrag',
            value: 'Bedrag',
          },
          {
            key: 'status',
            description: 'Is het betaald?',
            value: 'Status',
          },
        ],
        rows: [
          [
            {
              key: 'periode',
              value: '2023-6-1',
              type: 'date',
            },
            {
              key: 'bedrag',
              value: '€250',
            },
            {
              key: 'status',
              value: 'Openstaand',
            },
          ],
          [
            {
              key: 'periode',
              value: '2023-5-1',
              type: 'date',
            },
            {
              key: 'bedrag',
              value: '€250',
            },
            {
              key: 'status',
              value: 'Openstaand',
            },
          ],
          [
            {
              key: 'periode',
              value: '2023-4-1',
              type: 'date',
            },
            {
              key: 'bedrag',
              value: '€250',
            },
            {
              key: 'status',
              value: 'Openstaand',
            },
          ],
          [
            {
              key: 'periode',
              value: '2023-3-1',
              type: 'date',
            },
            {
              key: 'bedrag',
              value: '€250',
            },
            {
              key: 'status',
              value: 'Betaald',
            },
          ],
          [
            {
              key: 'periode',
              description:
                'Een voorbeeld van een lege row. Deze omschrijving is niet nodig voor een lege row.',
              value: '',
            },
          ],
          [
            {
              key: 'periode',
              value: 'Totaal',
              type: 'bold',
            },
            {
              key: 'bedrag',
              value: '€1000',
            },
            {
              key: 'status',
              value: '',
            },
          ],
        ],
      },
    },
  ],
};
